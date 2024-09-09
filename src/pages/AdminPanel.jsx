// import React, { useEffect, useState } from 'react';
// import "./adminpanel.scss";
// import ListCheckOut from '../components/modal/ListCheckOut';
// import axios from 'axios';
// import { getDockerSetups } from '../api/breakaway';

// function AdminPanel() {
//     const [isopen, setIsOpen] = useState(false)
//     const [selectedData, setSelectedData] = useState(null);
//     const [listData, setListData] = useState([])


//     useEffect(()=>{
//       // getDockerSetups()
//       getList()
//     },[])

//     const getList = async () =>{
//       try{
//         const data = await getDockerSetups()
//         console.log(data, "all acct")
//         const newAprroved = data.filter((item) => item.dockerStatus === 'approved');
//         console.log(newAprroved, "Approved")
//         const newData = data.filter((item) => item.dockerStatus === 'pending');
//         setListData(newData);
//       }catch (error) {
//         console.error('Error fetching Docker setups:', error.message);

//       }

//     }

//     console.log(listData, "pending")


//     const openCheckOutModal = (data)=>{
//         setSelectedData(data)
//         setIsOpen(true)
//     }
//     const closeCheckOutModal = ()=>{
//         setIsOpen(false)
//         setSelectedData(null);
//     }
  
//   const truncateText = (text, wordLimit) => {
//     const stringText = String(text); // Convert to string if it's not already
//     const words = stringText.split(' ');
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return stringText;
//   };

//   return (
//     <div className='admin-container-wrap'>
//         <h1>Admin Contorller </h1>
//         <p>Confirm the details before approving. Immediately after the community is approved, the community will go live.</p>
//         <div className="table-wrap">
//       <table>
//         <thead>
//           <tr>
//             <th className="reference">ContainerName</th>
//             <th>Community-id</th>
//             <th className="date">Platform Creator</th>
//             <th className="date">Admins</th>
//             <th>Domain</th>
//             <th>Title</th>
//             <th>About</th>
//             <th>Port</th>
//             <th>Tags</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody className="table-body">
//           {listData.length > 0 ? (
//             listData.map((data, index) => (
//               <tr className="table-tr" key={index}>
//                 <td>{truncateText(data.containerName, 10)}</td>
//                 <td>{truncateText(data.communityId, 10)}</td>
//                 <td>{truncateText(data.platformCreator, 10)}</td>
//                 <td>{truncateText(data.admins, 10)}</td>
//                 <td>{truncateText(data.domain, 10)}</td>
//                 <td>{truncateText(data.communityTitle, 10)}</td>
//                 <td>{truncateText(data.aboutPlatform, 3)}</td>
//                 <td>{truncateText(data.port, 3)}</td>
//                 <td>{truncateText(data.tags, 10)}</td>
//                 <td><button className='review-btn' onClick={() => openCheckOutModal(data)}>Review</button></td>
//               </tr>
//             ))
//           ) : (
//             // <tr>
//             //   <td colSpan="7">Community List Is Empty</td>
//             // </tr>
//             // <div className="empty"><span>Community List Is Empty</span></div>
//             <tr>
//         <td colSpan="10">
//           <div className="empty"><span>Community List Is </span></div>
//         </td>
//       </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     <ListCheckOut isOpen={isopen} closeCheckOutModal={closeCheckOutModal} selectedData={selectedData} getList={getList} />
//     </div>
//   );
// }

// export default AdminPanel;


import React, { useEffect, useState } from 'react';
import "./adminpanel.scss";
import ListCheckOut from '../components/modal/ListCheckOut';
import { getDockerSetups } from '../api/breakaway';

function AdminPanel() {
  const [isopen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [listData, setListData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // State for tracking active tab

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const data = await getDockerSetups();
      // console.log(data, "all setups");

      const newApproved = data.filter((item) => item.dockerStatus === 'approved');
      setApprovedData(newApproved); // Set approved data

      const newPending = data.filter((item) => item.dockerStatus === 'pending');
      setListData(newPending); // Set pending data
    } catch (error) {
      console.error('Error fetching Docker setups:', error.message);
    }
  };

  const openCheckOutModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeCheckOutModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const truncateText = (text, wordLimit) => {
    const stringText = String(text); // Convert to string if it's not already
    const words = stringText.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return stringText;
  };

  return (
    <div className='admin-container-wrap'>
      <h1>Admin Controller</h1>
      <p>Confirm the details before approving. Immediately after the community is approved, the community will go live.</p>

      <div className="tab-buttons">
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending List
        </button>
        <button
          className={activeTab === 'approved' ? 'active' : ''}
          onClick={() => setActiveTab('approved')}
        >
          Approved List
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="constainername">ContainerName</th>
              <th className='community-id'>Community-id</th>
              <th className="platfrom-creator">Platform Creator</th>
              <th className="admins">Admins</th>
              <th className='domain'>Domain</th>
              <th>Title</th>
              <th>About</th>
              <th className='port'>Port</th>
              <th>Tags</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {activeTab === 'pending' && listData.length > 0 ? (
              listData.map((data, index) => (
                <tr className="table-tr" key={index}>
                  <td className="constainername">{truncateText(data.containerName, 10)}</td>
                  <td className='community-id'>{truncateText(data.communityId, 10)}</td>
                  <td className="platfrom-creator">{truncateText(data.platformCreator, 10)}</td>
                  <td className="admins">{truncateText(data.admins, 10)}</td>
                  <td className='domain'>{truncateText(data.domain, 10)}</td>
                  <td>{truncateText(data.communityTitle, 10)}</td>
                  <td>{truncateText(data.aboutPlatform, 3)}</td>
                  <td>{truncateText(data.port, 3)}</td>
                  <td>{truncateText(data.tags, 10)}</td>
                  <td><button className='review-btn' onClick={() => openCheckOutModal(data.communityId)}>Review</button></td>
                </tr>
              ))
            ) : activeTab === 'approved' && approvedData.length > 0 ? (
              approvedData.map((data, index) => (
                <tr className="table-tr" key={index}>
                  <td className="constainername">{truncateText(data.containerName, 10)}</td>
                  <td className='community-id'>{truncateText(data.communityId, 10)}</td>
                  <td className="platfrom-creator">{truncateText(data.platformCreator, 10)}</td>
                  <td className="admins">{truncateText(data.admins, 10)}</td>
                  <td className='domain'>{truncateText(data.domain, 10)}</td>
                  <td>{truncateText(data.communityTitle, 10)}</td>
                  <td>{truncateText(data.aboutPlatform, 3)}</td>
                  <td>{truncateText(data.port, 3)}</td>
                  <td>{truncateText(data.tags, 10)}</td>
                  <td><button className='review-btn' onClick={() => openCheckOutModal(data.communityId)}>Review</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">
                  <div className="empty"><span>No {activeTab === 'pending' ? 'Pending' : 'Approved'} Communities</span></div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ListCheckOut
        isOpen={isopen}
        closeCheckOutModal={closeCheckOutModal}
        selectedId={selectedId}
        getList={getList}
      />
    </div>
  );
}

export default AdminPanel;
