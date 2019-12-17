// Deprecated Component: please see https://gitlab.com/shaohanghe91/health_and_wellness_map/merge_requests/35 and https://trello.com/c/6DYWZIgj/39-skip-dialog-box-and-hamburger-menu for details"

import React from "react";
import Modal from "react-responsive-modal";
import Logo from '../images/SWH_2blue_horizontal.png';
import LocateIcon from '@material-ui/icons/MyLocation';

const styles = {
  fontFamily: "dinreg",
  textAlign: "center"
};

class ModalComponent extends React.Component {
  state = {
    open: true
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <Modal open={open} onClose={this.onCloseModal} center>
          <img src={Logo} width='75%' alt=''></img>
          <p>
            Welcome to Health & Wellness Map, brought to you by Student Services.
            <br />To use the map, simply fill out the optional categories on the left sidebar, and view your results on the right sidebar that will pop-out. You can click on the <LocateIcon /> icon to find all the services on the map.
            <br />
            <br />Alternatively you may search for a keyword in the "keyword" tab, where you can type such services as 'blood test', or 'consultation', and view your results on the right sidebar. All available services will be shown as autocomplete options once you start typing.
            <br />
            <br />Once you've found a service that interests you, click the map pin to pan to the service's location and view details about the service and visit their website.
            <br />Should you have any questions or concerns about the map or any of the services on it please contact communications.stuserv@mcgill.ca .
          </p>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
