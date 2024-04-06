import React, { useState, useEffect } from 'react';
import { RpcProvider } from 'starknet';


const provider = new RpcProvider({ nodeUrl: process.env.REACT_APP_RPC_URL_STK });


function AplikasiSTK() {
  const [data, setData] = useState({});
  
  const [error, setError] = useState('');
  const [updateCount, setUpdateCount] = useState(0); // State to track update count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockNumberResponse = await provider.getBlockWithTxs('latest');
        console.log('Current block number:', blockNumberResponse);
  
        // Parse hexadecimal values to decimal
        const blockNumberDecimal = parseInt(blockNumberResponse.block_number, 16).toString();
        const dataver = blockNumberResponse.starknet_version
        const datastatus = blockNumberResponse.status
        const datatimestamp = blockNumberResponse.timestamp
        const datagas = blockNumberResponse.l1_gas_price.price_in_wei


        setData({
          blockNumber: blockNumberDecimal,
          version : dataver,
          status : datastatus,
          timestamp : datatimestamp,
          gas: parseInt(datagas, 16),
        });
  
        // Increment update count
        setUpdateCount(prevCount => prevCount + 1);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to fetch data. Check console for details.');
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">STARKNET DATA</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <InfoBox label="Block Number" value={data.blockNumber} />
        <InfoBox label="Starknet Version" value={data.version} />
        <InfoBox label="Status" value={data.status} />
        <InfoBox label="Timestamp" value={data.timestamp} />
        <InfoBox label="Gas Price (wei)" value={data.gas} />
      </div>
      {updateCount > 0 && (
        <div className="mt-4 p-3 bg-green-200 text-green-800 rounded">
          Ini request ke {updateCount}  bosquee 🚀🚀🚀
        </div>
      )}
    </div>
  );
}

const InfoBox = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded shadow">
    <strong>{label}:</strong> {value !== null ? value : 'Loading...'}
  </div>
);

export default AplikasiSTK;