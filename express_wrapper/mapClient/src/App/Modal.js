import React from "react";
import Modal from "react-responsive-modal";
import Logo from '../images/SWH_2blue_horizontal.png';

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
            Welcome to version 0.9 of the Health & Wellness Map, brought to you by Student Services.
            <br></br>To use the map, simply fill out the optional categories on the left sidebar, and view your results on the right sidebar that will pop-out.
            <br></br>Alternatively you may search for a keyword in the "keyword" tab, where you can type such services as 'blood test', or 'consultation', and view your results on the right sidebar.
            <br></br>Once you've found a service that interests you, click the map pin to pan to the service's location and view details about the service and visit their website.
          </p>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
