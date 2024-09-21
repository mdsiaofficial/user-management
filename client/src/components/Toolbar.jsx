import React from 'react';

const Toolbar = () => {
  const onBlock = () => {
    
  }
  const onUnblock = () => {

  }
  const onDelete = () => {

  }
  const onLogout = () => {

  }
  
  return (
    <div className="flex gap-10 items-center justify-center" >
      <button className="bbbutton font-bold bg-amber-100 hover:bg-amber-400" onClick={onBlock}>
        Block
      </button>
      <button className="bbbutton font-bold bg-lime-200 hover:bg-lime-500" onClick={onUnblock}>
        Unblock
      </button>
      <button className="bbbutton font-bold bg-red-200 hover:bg-red-500" onClick={onDelete}>
        Delete
      </button>
      <button className="bbbutton font-bold bg-orange-900 hover:bg-orange-200" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Toolbar;