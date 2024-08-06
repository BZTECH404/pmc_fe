import React from 'react'

function Footer() {
  return (
    <footer className="footer-area footer-style-one mt-110">
      <div className="container">
        <div className="footer-main">
          <div className="row gy-5 d-flex justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <form action="#" id="subscribe_form">
                  <h3 className="form-title">subscribe us</h3>
                  <div className="form-wrap d-flex align-items-center">
                    <input type="email" placeholder="Enter Your Email" />
                    <button type="submit">Send</button>
                  </div>
                </form>
                <div className="footer-contact-links">
                  <div className="contact-option">
                    <div className="icon">
                      <i className="bi bi-telephone-plus" />
                    </div>
                    <div className="link">
                      <a href="tel:  022 6613 0100"> 022 6613 0100</a> /
                      <a href="tel:  +91 88980 00228"> +91 88980 00228</a>

                    </div>
                  </div>
                  <div className="contact-option">
                    <div className="icon">
                      <i className="bi bi-envelope" />
                    </div>
                    <div className="link">
                      <a href="neomodernarch@gmail.com">
                        <span
                          className="__cf_email__"
                          data-cfemail="8ae3e4ece5caeff2ebe7fae6efa4e9e5e7"
                        >
                          neomodernarch@gmail.com
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="contact-option">
                    <div className="icon">
                      <i className="bi bi-geo-alt" />
                    </div>
                    <div className="link">
                      <a>
                        1st Floor, PINNACLE BUSINESS PARK, <br />Mahakali Caves Rd, next to Ahura center, next to M.I.D.C, Gundavali, Andheri East, Mumbai, Maharashtra 400093
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h5 className="widget-title">Quick Links</h5>
                <ul className="widget-links">
                  <li>
                    <a href="login.html">My Account</a>
                  </li>
                  <li>
                    <a>Register</a>
                  </li>
                  <li>
                    {/* <a href="contact.html">Lawyer Consulting</a> */}
                  </li>
                  <li>
                    {/* <a href="#">Sorteo Locemses</a> */}
                  </li>
                  <li>
                    {/* <a href="privacy.html">Privacey Policy</a> */}
                  </li>
                  <li>
                    {/* <a href="#">Term &amp; Condition</a> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h5 className="widget-title">Help Center</h5>
              <ul className="widget-links">
                <li>
                  <a href="contact.html">Help Center</a>
                </li>
                <li>
                  <a href="faq.html">FAQ</a>
                </li>
                <li>
                  <a href="#">Borrow</a>
                </li>
                <li>
                  <a href="contact.html">License Agreement</a>
                </li>
                <li>
                  <a href="#">Sell your Product</a>
                </li>
              </ul>
            </div>
          </div> */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget text-start">
                <div className="footer-disc">
                  <a >
                    <b style={{color:'red'}}>Vivek Bhole Architects Private Limited</b>
                    {/* <img src="assets/images/logo.png" alt="" /> */}
                  </a>
                  <p>
                    Established in the year 1996
                    <br/>
                    •⁠  ⁠An ISO 9001-2008 certified company<br/>
                    •⁠  ⁠Completed more than 200 million sq.ft of Mixed used developments<br/>
                    •⁠  ⁠Over 320 million Sq.ft under construction<br/>
                    •⁠  ⁠Proficiently equipped to handle jobs of various types and magnitude<br/>
                    •⁠  ⁠Worked with a diverse client base<br/>
                    •⁠  ⁠Innovative concepts, insightful planning<br/>
                    •⁠  ⁠High quality professional management<br/>
                    
                  </p>
                </div>
               
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </footer>
  )
}

export default Footer