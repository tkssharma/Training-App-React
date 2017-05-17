  'use strict';

  import React from 'react';
  import { connect } from 'react-redux';

  import { Link } from 'react-router';
  import { Row, Col } from 'antd';
  import * as Action from 'app/redux/actions/DB';
  import HeaderComp from 'app/components/common/Header';
  import FooterComp from 'app/components/common/Footer';

  const mapStateToProps = ( state, ownProps ) => {
    return {
      trainings: state.www.get('training'),
      user: state.user.get('profile'),
    }
  }
  const mapDispatchToProps = dispatch => ({
  });

  let Header_section = (<section className="hero ng-scope">
  <div className="container">
      <div className="logo-holder">
          <Link to="/auth/login"><img alt="Tech logo angular" src="images/angular.svg"/></Link>
          <Link to="/auth/login"><img alt="React" src="images/react.svg"/></Link>
          <Link to="/auth/login"><img alt="Js" src="images/javascript.svg"/></Link>
          <Link to="/auth/login"><img alt="Tech logo d3" src="images/d3.svg"/></Link>
          <Link to="/auth/login"><img alt="Es6" src="images/jss.svg"/></Link>
      </div>
      <h1 className="mega title">GenNext Training to deliver project based
          learning to give you the head start you need as a developer</h1>
      <p className="subtitle">Level up your programming skills today with
          condensed video lessons on industry leading web frameworks and tools!</p>
      <Link to="/auth/login" id="signup"  className="custom-btn custom-btn-red custom-btn-primary">Unlock the
          Knowledge  <small><i>click here to start</i></small>
      </Link>
  </div>

  </section>);

  let Home = (props) => {

    return (
          <div>
            <div className="header">
              <HeaderComp/>
            </div>
             {Header_section}
            <div className="footer">
                <FooterComp/>
            </div>
          </div>
    )

  }

  const ConnectHome = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)


  export default ConnectHome;
