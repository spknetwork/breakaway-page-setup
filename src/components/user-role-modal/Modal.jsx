import React, { useState } from 'react';
import './modal.scss';

export const RoleModal = (props) => {

  const { isOpen, onClose, updateUserRole, communityName, communityMod, setCommunityMod, role, setRole } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserRole();
    onClose();
    setCommunityMod("")
    setRole("")
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='modal-top'>
            <h2>Set User Role</h2>
            <span 
            className="close-modal"
            onClick={onClose}
            >X</span>
        </div>
        <form className="role-form" onSubmit={handleSubmit}>
        <span className='extra-info'>(Make a user admin/mod to help manage your community)</span>
          <div className='community-info'>
              <input
                type="text"
                value={communityName}
                required
                readOnly
              />
          </div>
          <div className='community-info'>
              <input
                type="text"
                placeholder="enter hive username"
                value={communityMod}
                onChange={(e) => setCommunityMod(e.target.value)}
                required
              />
          </div>
          <div className='community-info'>
              <input
                type="text"
                value={role}
                placeholder="enter role (mod/admin)"
                onChange={(e) => setRole(e.target.value)}
                required
              />
          </div>
          <button className='btn' type="submit">Add Role</button>
        </form>
      </div>
    </div>
  );
};
