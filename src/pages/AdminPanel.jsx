import React, { useEffect, useState } from 'react';
import "./adminpanel.scss";
import ListCheckOut from '../components/modal/ListCheckOut';
import { getDockerSetups } from '../api/breakaway';
import { useNavigate } from 'react-router-dom';


function AdminPanel({setIsAuthenticated, isAuthenticated}) {
  const [isopen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [listData, setListData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); 
  const [data, setData] = useState([])
  const [allList, setAllList] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const navigate = useNavigate();
  


  useEffect(() => {
    getList();
  }, [isDeleted]);
  

  const getList = async () => {
    try {
      const data = await getDockerSetups();
      setData(data)
      console.log(data)
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
  const removeDeleteBtn = () => {
    setAllList(false)
  };

  const truncateText = (text, wordLimit) => {
    const stringText = String(text); // Convert to string if it's not already
    const words = stringText.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return stringText;
  };

  const handleLogout = ()=>{
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
    navigate("/")

  }
  // getList();
  


  // *******************new*******************
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Call login function on component mount
  //   authenticateUser();
  // }, []);

  // const authenticateUser = async () => {
  //   try {
  //     const response = await loginWithKeychain();
  //     if (response.success) {
  //       setIsAuthenticated(true); // User is authenticated
  //     } else {
  //       navigate('/login'); // Redirect to login page if authentication fails
  //     }
  //   } catch (error) {
  //     console.error('Authentication failed:', error);
  //     navigate('/login'); // Redirect to login page if an error occurs
  //   }
  // };

  // if (!isAuthenticated) {
  //   return <div>Loading...</div>; // Or redirect the user, or show a login prompt
  // }

  return (
    <div className='admin-container-wrap'>
      <h1>Admin Controller</h1>  
      <p>Please check all details carefully before approving. once a community is approved, it gets listed</p>

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
        {isAuthenticated &&<span className='admin-logout' onClick={handleLogout}>Logout</span>}
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
              {/* <th className='port'>Port</th> */}
              {/* <th>Tags</th> */}
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
                  {/* <td>{truncateText(data.port, 3)}</td> */}
                  {/* <td>{truncateText(data.tags, 10)}</td> */}
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
                  {/* <td>{truncateText(data.port, 3)}</td> */}
                  {/* <td>{truncateText(data.tags, 10)}</td> */}
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

    <div className="table-wrap all-list">
    <h3>list of communities: Approved, pending and canceled </h3>
      <table>
        <thead>
          <tr>
            <th className="constainername">ContainerName</th>
            <th className='community-id'>Community-id</th>
            <th className="platfrom-creator">Platform Creator</th>
            <th className="admins">Admins</th>
            <th className='domain'>Domain</th>
            <th>Title</th>
            {/* <th className='about'>About</th> */}
            <th className='port'>Status</th>
            {/* <th>Tags</th> */}
            <th >Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          { data.length > 0 ? (
            data.map((data, index) => (
              <tr className="table-tr" key={index}>
                <td className="constainername">{truncateText(data.containerName, 10)}</td>
                <td className='community-id'>{truncateText(data.communityId, 10)}</td>
                <td className="platfrom-creator">{truncateText(data.platformCreator, 10)}</td>
                <td className="admins">{truncateText(data.admins, 10)}</td>
                <td className='domain'>{truncateText(data.domain, 10)}</td>
                <td>{truncateText(data.communityTitle, 10)}</td>
                {/* <td className='about'>{truncateText(data.aboutPlatform, 3)}</td> */}
                <td><span className={`status-color ${data.dockerStatus === 'approved' ? 'approved' : data.dockerStatus === 'canceled' ? 'cancel' : 'pending'} `}>{truncateText(data.dockerStatus, 3)}</span></td>
                {/* <td>{truncateText(data.tags, 10)}</td> */}
                <td><button className='review-btn' onClick={() =>{openCheckOutModal(data.communityId); setAllList(true)}}>Review</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">
                <div className="empty"><span>No Communities</span></div>
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
        allList={allList}
        removeDeleteBtn={removeDeleteBtn}
        setIsDeleted={setIsDeleted}
      />
    </div>
  );
}

export default AdminPanel;
