import React from 'react';

const MyAccount = () => {
  const styles = {
    container: { marginTop: '1rem', marginBottom: '1rem', padding: '1rem', display: 'flex', justifyContent: 'center' },
    card: { padding: '1rem' },
    image: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    btn: { height: '140px', width: '140px', borderRadius: '50%' },
    name: { fontSize: '22px', fontWeight: 'bold', marginTop: '1rem' },
    idd: { fontSize: '14px', fontWeight: '600' },
    idd1: { fontSize: '12px' },
    number: { fontSize: '22px', fontWeight: 'bold' },
    follow: { fontSize: '12px', fontWeight: '500', color: '#444444' },
    btn1: { height: '40px', width: '150px', border: 'none', backgroundColor: '#000', color: '#aeaeae', fontSize: '15px' },
    text: { fontSize: '13px', color: '#545454', fontWeight: '500' },
    icons: { fontSize: '19px' },
    join: { fontSize: '14px', color: '#a0a0a0', fontWeight: 'bold' },
    date: { backgroundColor: '#ccc' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.image}>
          <button style={styles.btn}>
            <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
          </button>
          <span style={styles.name}>Eleanor Pena</span>
          <span style={styles.idd}>@eleanorpena</span>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2' }}>
            <span style={styles.idd1}>Oxc4c16a645_b21a</span>
            <span><i className="fa fa-copy"></i></span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
            <span style={styles.number}>1069 <span style={styles.follow}>Followers</span></span>
          </div>
          <div style={{ display: 'flex', marginTop: '2' }}>
            <button style={styles.btn1}>Edit Profile</button>
          </div>
          <div style={styles.text}>
            <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<br /><br /> Artist/ Creative Director by Day #NFT minting@ with FND night. </span>
          </div>
          <div style={{ gap: '3', marginTop: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <span><i className="fa fa-twitter"></i></span>
            <span><i className="fa fa-facebook-f"></i></span>
            <span><i className="fa fa-instagram"></i></span>
            <span><i className="fa fa-linkedin"></i></span>
          </div>
          <div style={{ padding: '2', borderRadius: '1rem', marginTop: '1rem', ...styles.date }}>
            <span style={styles.join}>Joined May,2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;