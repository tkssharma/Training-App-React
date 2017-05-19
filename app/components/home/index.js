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

    let Video_section = (<section className="hero ng-scope">
	<div className="hero__background">

		<div className="header-video">
			<img src="" className="header-video__media " data-video-url="https://www.youtube.com/embed/Scxs7L0vhZ4" data-teaser="video/teaser-video" data-video-width="560" data-video-height="315"/>
			<video autoplay="true" loop="true" muted="" id="header-video__teaser-video" className="header-video__teaser-video">
				<source src="video/video.webm" type="video/mp4"/>
				<source src="video/video.mp4" type="video/mp4"/>
			</video>
		</div>
	</div>
	<div className="hero__content page-container page-container-full text-center">
		<div className="va-container va-container-v va-container-h">
			<div className="va-middle">
				<div className="visible-lg  visible-md" id="logo">
				</div>
				<h1 className="text-bold-heading text-branding text-jumbo text-contrast space-1">
					Lean how to Code</h1>
				<div className="h4 text-contrast space-4">Learn different technologies</div>
				<a href="" data-dismiss="modal" data-toggle="modal" data-target="#infoModal" className="btn btn-primary"> How It Works
				</a>
			</div>
		</div>
	</div>
  </section>);

  let Home = (props) => {

    return (
          <div>
            <div className="header">
              <HeaderComp/>
            </div>
            {Video_section}

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
