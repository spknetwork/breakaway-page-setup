import React, { useEffect, useState } from 'react';
import "./listcheckout.scss";
import { confirmDockerRequest, cancelDockerRequest, getDockerSetups } from '../../api/breakaway';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { FaRegCopy } from 'react-icons/fa';

function ListCheckOut({ isOpen, closeCheckOutModal, selectedId, getList }) {
  const [showButton, setShowButton] = useState(true);
  const [list, setList] = useState(null); // Store the selected community data

  useEffect(() => {
    if (selectedId) {
      displayList(selectedId); // Pass selectedId correctly
    }
  }, [selectedId]);

  const displayList = async (id) => {
    try {
      const data = await getDockerSetups();
      const newData = data.find((data) => data.communityId === id); // Find the community with selectedId
      if (newData) {
        setList(newData); // Set the list state with the found data
        checkApproved(newData); // Check if it's approved
      }
    } catch (error) {
      console.error('Error fetching data for selected community:', error);
    }
  };

  const checkApproved = (communityData) => {
    if (communityData.dockerStatus === "approved") {
      setShowButton(false); // Hide buttons if approved
    } else {
      setShowButton(true); // Show buttons if not approved
    }
  };

  // console.log(showButton)

  if (!selectedId || !list) {
    return null; // Return nothing if no selectedId or list is not set yet
  }

  const handleApprove = async () => {
    try {
      const response = await confirmDockerRequest(list._id); // Use list._id to approve
      toast.success('Community approved successfully!'); 
      getList(); // Refresh the list
      closeCheckOutModal(); 
    } catch (error) {
      toast.error('Failed to approve community.'); 
    }
  };

  const handleCancel = async () => {
    try {
      const response = await cancelDockerRequest(list._id); // Use list._id to cancel
      toast.success('Community deleted successfully!');
      getList(); // Refresh the list
      closeCheckOutModal(); 
    } catch (error) {
      toast.error('Failed to delete community.'); 
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy.');
      });
  };

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={closeCheckOutModal}></div>
      <div className="modal slide-up">
        <span className="close-btn" onClick={closeCheckOutModal}>X</span>
        <div className="delete-wrap">
          <h2>Community Info</h2>
          <div className="checkoutlist">
            <div className="checklist-wrap">
              <span>Container Name:</span> <span className='info-copy-wrap'> <span>{list.containerName}</span> <FaRegCopy size={13} onClick={() => copyToClipboard(list.containerName)}/></span>

            </div>
            <div className="checklist-wrap">
              <span>hive-community-id:</span> <span className='info-copy-wrap'> <span>{list.communityId}</span><FaRegCopy onClick={() => copyToClipboard(list.communityId)}/></span>

            </div>
            <div className="checklist-wrap">
              <span>Title:</span> <span className='info-copy-wrap'><span>{list.communityTitle}</span><FaRegCopy onClick={() => copyToClipboard(list.communityTitle)}/></span>

            </div>
            <div className="checklist-wrap">
              <span>Admin:</span> <span className='info-copy-wrap'><span>{list.admins}</span><FaRegCopy onClick={() => copyToClipboard(list.admins)}/></span>

            </div>
            <div className="checklist-wrap">
              <span>Domain:</span><span className='info-copy-wrap'><span>{list.domain}</span><FaRegCopy onClick={() => copyToClipboard(list.domain)}/></span>

            </div>
            <div className="checklist-wrap">
              <span>About:</span> <span className='info-copy-wrap'><span>{list.aboutPlatform}</span><FaRegCopy onClick={() => copyToClipboard(list.aboutPlatform)} /></span>

            </div>
            <div className="checklist-wrap">
              <span>Port:</span> <span className='info-copy-wrap'><span>{list.port}</span><FaRegCopy onClick={() => copyToClipboard(list.port)}/></span>

            </div>
            <div className="checklist-wrap">
              <span>Tags:</span> <span className='info-copy-wrap'><span>{list.tags}</span><FaRegCopy onClick={() => copyToClipboard(list.tags)}/></span>

            </div>
          </div>
          {showButton && (
            <div className="delete-btn-wrap">
              <button className="btn-mistake" onClick={handleApprove}>Approve</button>
              <button className="btn-delete" onClick={handleCancel}>Yes, Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCheckOut;
