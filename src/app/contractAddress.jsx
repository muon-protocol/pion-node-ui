import { useNetwork } from "wagmi";

const { chain } = useNetwork();
console.log(chain);
