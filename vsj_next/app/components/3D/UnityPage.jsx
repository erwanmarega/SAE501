import React from 'react';

const UnityPage = () => {
    return (
        <div className='w-full h-full row-start-1 row-end-8 col-start-1 col-end-4 flex items-center  justify-center'>
            <iframe
        src="/3D_model/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Unity WebGL"
        allowFullScreen
      />
        </div>
    );
};

export default UnityPage;