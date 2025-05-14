import { readFileSync } from 'fs';

import * as fs from "node:fs";

export interface CreatedArtifact {
    _format: string;
    contractName: string;
    sourceName: string;
    abi: Array<{
        anonymous?: boolean;
        inputs?: Array<{
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }>;
        name?: string;
        type: string;
        stateMutability?: string;
        outputs?: Array<{
            components?: Array<{
                internalType: string;
                name: string;
                type: string;
            }>;
            internalType?: string;
            name: string;
            type: string;
        }>;
    }>;
    bytecode: string;
    deployedBytecode: string;
    linkReferences: Record<string, never>;
    deployedLinkReferences: Record<string, never>;
}

function createUrl() {
    if (!process.env.CONTRACT_NAME || !process.env.CONTRACT_ADDRESS || !process.env.CONTRACT_BLOCK) {
        console.log(`Missing required environment variables: ${!process.env.CONTRACT_NAME}, ${!process.env.CONTRACT_ADDRESS}, ${!process.env.CONTRACT_BLOCK}`);
        // throw new Error('Missing required environment variables: CONTRACT_NAME, CONTRACT_ADDRESS, CONTRACT_BLOCK');
    }

    const contractPath = `../artifacts/contracts/${process.env.CONTRACT_NAME}.sol/${process.env.CONTRACT_NAME}.json`;
    const contract: CreatedArtifact = JSON.parse(readFileSync(contractPath, 'utf8'));
    fs.writeFileSync('./abi.json', JSON.stringify(contract.abi));

    console.log(`graph init ${contract.contractName.toLowerCase()} --ipfs=http://localhost:5001/ipfs --abi=./abi.json --from-contract=${process.env.CONTRACT_ADDRESS} --network=ethereum --contract-name=${contract.contractName} --start-block=${process.env.CONTRACT_BLOCK} --skip-git`);

    // fs.unlink('./abi.json', (err) => {
    //     if (err) throw err;
    // });
}

createUrl()