import axios from "axios";
import moment from "moment";
import { Web3 } from "web3";

const BASEURL =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_PROXY_URL_DEV
    : process.env.NEXT_PUBLIC_PROXY_URL;

const web3 = new Web3();
const getNodeInfo = async (nodeId) => {
  const listOfNodes = [`${BASEURL}/nodes`];
  let tryed = 0;
  let res;
  var flag = false;

  while (tryed < 3 && !flag) {
    res = await axios
      .request({
        signal: AbortSignal.timeout(15000),
        method: "GET",
        url: `${
          listOfNodes[tryed % listOfNodes.length]
        }/${nodeId}/status?rand=${Math.floor(Math.random() * 100000)}`,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    // res = await helpFunction(
    //   `${
    //     listOfNodes[tryed % listOfNodes.length]
    //   }/${nodeId}/status?rand=${Math.floor(Math.random() * 100000)}`
    // );
    if (res === "timeOut" || res === false) {
      tryed++;
      res = false;
    } else {
      return res;
    }
  }
  return res;
};

export const getNodeInfoData = async (walletAddress) => {
  const response = await getNodeInfo(walletAddress);

  const res = response.data.result;
  console.log(res);
  let nodeInfoData = { nodeInfo: {} };
  if (res && res === "node not found") {
    window.location.replace("https://alice-v2.muon.net/");
    return false;
  } else if (res && res != "node not found") {
    nodeInfoData.nodeInfo.haveNode = true;
    nodeInfoData.nodeIsActive = "Loading...";
    nodeInfoData.nodeInfo["isNew"] = res.node["isNew"];
    nodeInfoData.nodeInfo["active"] = res["node"]["active"];
    const tests = res["node"]["tests"];
    nodeInfoData.nodeInfo["nodeAddress"] = res["node"]["nodeAddress"];
    nodeInfoData.nodeInfo["id"] = res["node"]["id"];
    nodeInfoData.nodeInfo["peerId"] = res["node"]["peerId"];
    nodeInfoData.nodeInfo["startTime"] = moment(
      res["node"]["startTime"] * 1000
    ).format("dddd, MMMM Do YYYY, h:mm:ss a");
    if (res["node"]["endTime"]) {
      nodeInfoData.nodeInfo["endTime"] = moment(res["node"]["endTime"] * 1000);
      nodeInfoData.nodeIsActive = "Exited";
    } else {
      nodeInfoData.nodeInfo["endTime"] = false;
    }
    try {
      nodeInfoData.nodeInfo["rewardAmount"] = Number(
        web3.utils.fromWei(
          res["reward"]["earned"].toLocaleString("fullwide", {
            useGrouping: false,
          }),
          "ether"
        )
      ).toFixed(4);
    } catch (error) {
      console.log(error);
    }
    nodeInfoData.nodeInfo["nodeIP"] = res["node"]["ip"];
    nodeInfoData.nodeInfo["staked"] = web3.utils.fromWei(
      res["reward"]["balance"].toLocaleString("fullwide", {
        useGrouping: false,
      }),
      "ether"
    );
    nodeInfoData.nodeInfo["onlinePercent"] = res["reward"]["onlinePercent"];

    if (nodeInfoData.nodeInfo["active"]) {
      nodeInfoData.nodeIsActive = nodeInfoData.nodeInfo.isNew
        ? "Your node has been added to the network successfully. Its initialization will take a few minutes."
        : tests["networking"] && tests["peerInfo"] && tests["status"]
        ? "Online"
        : "Offline";
      nodeInfoData.nodeInfo["messages"] = res["messages"];
      nodeInfoData.nodeInfo["rewardPercent"] = res["reward"]["rewardPercent"];
      nodeInfoData.nodeInfo["history"] = res["history"].reverse();

      var messages = [];
      for (var [i, valueFrom] of nodeInfoData.nodeInfo["history"].entries()) {
        if (!valueFrom["isOnline"]) {
          var flag = false;
          var from = valueFrom;
          // var fromDate = new Date(from["timestamp"] * 1000);
          var fromDate = moment(from["timestamp"] * 1000);
          var fromMoment = moment(fromDate);
          for (var [j, valueTo] of nodeInfoData.nodeInfo["history"]
            .slice(i)
            .entries()) {
            if (valueTo["isOnline"]) {
              // var toDate = new Date(valueTo["timestamp"] * 1000);
              var toDate = moment(valueTo["timestamp"] * 1000);
              var toMoment = moment(toDate);
              messages.push(
                `${fromDate.format(
                  "YYYY-M-D HH:mm:ss A"
                )} until ${toDate.format(
                  "YYYY-M-D HH:mm:ss A"
                )} for ${toMoment.to(fromMoment, true)}`
              );
              flag = false;
              break;
            } else {
              flag = true;
            }
          }
          if (flag) {
            messages.push(
              `${fromDate.format(
                "YYYY-M-D H:m:s A"
              )} until now for ${moment().to(fromMoment, true)}`
            );
          }
        }
      }
      nodeInfoData.nodeInfo["downNodeTimes"] = messages;
    }
  }
  return nodeInfoData;
};
