import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { _userInfo } from '../utils/axios_controllers';

const Banned = () => {
    const navigate_to = useNavigate();
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })


    useEffect(() => {
        if (data?.data?.isBanned === false) {
            navigate_to('/booksearch')
        }
    }, [data?.data?._id, data?.data?.isBanned])

    return (
        <div>
            <img className='w-screen h-screen' src="https://entrackr.com/storage/2022/02/banned.jpg" alt="" />
        </div>
    );
};

export default Banned;