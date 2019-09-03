import React from 'react';

export default () => {
  return (
    <footer className="text-muted text-white mt-5 p-4 text-center ">


  Copyright &copy;  {new Date().getFullYear()}

       <img src={process.env.PUBLIC_URL + '/img/logo10.png'} alt=""/>







    </footer>

  );
};
