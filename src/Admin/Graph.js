import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import  {baseurl}  from "../api";

const Graph = () => {
    const [tenders, setTenders] = useState([]);
    const [selectedTenderId, setSelectedTenderId] = useState('');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchTenders = async () => {
            const response = await axios.get(`${baseurl}/api/gettender`);
       if(response.data.tenders.length > 0)
       {
        setTenders(response.data.tenders);
        setSelectedTenderId(response.data.tenders[0]._id);
        return;
       }
            
        };

        fetchTenders();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`${baseurl}/api/tender/graph`, { id: selectedTenderId });
            const { totalDevelopers, developersWhoBid } = response.data.graphData;
            const developersWhoDidNotBid = totalDevelopers - developersWhoBid;

            setChartData({
                labels: ['Developers Who Bid', 'Developers Who Did Not Bid'],
                datasets: [{
                    data: [developersWhoBid, developersWhoDidNotBid],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                }],
            });
        };

        if (selectedTenderId) {
            fetchData();
        }
    }, [selectedTenderId]);

    const handleSelectChange = (event) => {
        setSelectedTenderId(event.target.value);
    };

    return (
        <div>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel id="tender-select-label">Select a tender</InputLabel>
            <Select
                labelId="tender-select-label"
                value={selectedTenderId}
                onChange={handleSelectChange}
                label="Select a tender"
            >

                {tenders && tenders.map(tender => (
                    <MenuItem key={tender._id} value={tender._id}>{tender.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        {chartData ? <Pie data={chartData} /> : <p>Loading...</p>}
    </div>
    );
};

export default Graph;