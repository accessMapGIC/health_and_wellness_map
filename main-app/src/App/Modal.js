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
            The Student Wellness Hub is happy to present version 1.0.0 of our Health and Wellness Map. 
            <br></br>Use the sidebar on the left to select search criteria. After submitting a list will be displayed showing all the services that fit the entered criteria.
          </p>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
