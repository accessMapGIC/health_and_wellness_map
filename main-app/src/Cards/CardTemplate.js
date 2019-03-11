import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import WebIcon from '@material-ui/icons/Web';
import DescriptionIcon from '@material-ui/icons/Description'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';
import data from '../store/newOutput.json';



const styles = theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: "#d0ecf4",
    marginLeft: '2px',
    marginRight: '2px',
    marginBottom: '10px',
    marginTop: '10px',
  },
  cardHeader: {
    paddingBottom: '0px !important',
  },
  openNow: {
    color: '#00ff00',
  },
  closed: {
    color: '#ff0000',
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  hoursExpand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    padding: "0px"
  },
  hoursExpandOpen: {
    transform: "rotate(180deg)",
    padding: "0px"
  },
  avatar: {
    backgroundColor: red[500]
  },
  materialIcons: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "-35%"
  },
  hourContent: {
    display: 'block',
    paddingLeft: "31px",
    paddingBottom: "1px !important",
    marginBottom: '0px',
  },
  active: {
    display: 'inline-block',
    fontWeight: "bold",
    width: '77px',
  },
  activeColumn: {
    display: 'inline-block',
    fontWeight: "bold",
    paddingLeft: '10px'
  },
  dayRow: {
    display: 'inline-block',
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  hoursColumn: {
    display: 'inline-block',
    paddingLeft: '10px',
  },
  dayColumn: {
    display: 'inline-block',
    width: '77px',
  }
});

class CardTemplateComponent extends React.Component {
  state = { 
    expanded: false, 
    hoursExpanded: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleHourExpandClick = () => {
    this.setState(state => ({ hoursExpanded: !state.hoursExpanded }));
  };

  handleCurrentDay = (hrs) => {
    const { classes } = this.props;
    const CurrentDay = this.props.tag;
    const format = 'hh:mm';
    const time = moment();
    const curDay = new Array(0);
    if(hrs[time.day()][0]==='NA'){
      curDay[0] = 'Closed';
    }else if(time.isBetween(moment(hrs[time.day()][0], format), moment(hrs[time.day()][1], format))){
      curDay[0] = 'Open Now : ' + hrs[time.day()][0] + '-' + hrs[time.day()][1];
    }else{
      curDay[0] = 'Closed';
    }
    return curDay;
  };

  getDayOrder(){
    const time = moment();
    switch(time.day()){
      case 0:
        return [[0,'Sunday'],[1,'Monday'],[2,'Tuesday'],[3,'Wednesday'],[4, 'Thursday'],[5, 'Friday'],[6, 'Saturday']];
      case 1:
      return [[1,'Monday'],[2,'Tuesday'],[3,'Wednesday'],[4, 'Thursday'],[5, 'Friday'],[6, 'Saturday'],[0,'Sunday']];
      case 2:
      return [[2,'Tuesday'],[3,'Wednesday'],[4, 'Thursday'],[5, 'Friday'],[6, 'Saturday'],[0,'Sunday'],[1,'Monday']];
      case 3:
      return [[3,'Wednesday'],[4, 'Thursday'],[5, 'Friday'],[6, 'Saturday'],[0,'Sunday'],[1,'Monday'],[2,'Tuesday']];
      case 4:
      return [[4, 'Thursday'],[5, 'Friday'],[6, 'Saturday'],[0,'Sunday'],[1,'Monday'],[2,'Tuesday'],[3,'Wednesday']];
      case 5:
      return [[5, 'Friday'],[6, 'Saturday'],[0,'Sunday'],[1,'Monday'],[2,'Tuesday'],[3,'Wednesday'],[4, 'Thursday']];
      case 6:
      return [[6, 'Saturday'],[0,'Sunday'],[1,'Monday'],[2,'Tuesday'],[3,'Wednesday'],[4, 'Thursday'],[5, 'Friday']];
    }
  }

  reOrderHours(hours){
    const curOrder = this.getDayOrder();
    const newArr = new Array(7);
    for(var i = 0; i<curOrder.length; i++){
      if(hours[curOrder[i][0]][0]=='NA'){
        newArr[i]=[curOrder[i][1], 'Closed'];
      }else{
        newArr[i]=[curOrder[i][1], hours[curOrder[i][0]][0] + '-' + hours[curOrder[i][0]][1]];
      }
    }
    return newArr;
  }

  render() {
    const { classes } = this.props;
    const orderedHours = this.reOrderHours(this.props.hours);
    const curDay = this.handleCurrentDay(this.props.hours);
    console.log(orderedHours);
    return (
      <Card className={classes.card}>
        <CardHeader 
          className={classes.cardHeader}
          action={
            <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          > 
            <ExpandMoreIcon />
          </IconButton>
          }
          
          title={this.props.title}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          {/* <IconButton aria-label="Share">
            <ShareIcon />
    </IconButton> */}
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <LocationOnIcon className={classes.materialIcons} /> - {this.props.address}
            </Typography>
            <Typography paragraph>
              <PhoneIcon className={classes.materialIcons} /> - {this.props.phone}
            </Typography>
            <Typography paragraph>
              <AccessTimeIcon className={classes.materialIcons} /> - {curDay[0]}
              <IconButton
                className={classnames(classes.hoursExpand, {
                  [classes.hoursExpandOpen]: this.state.hoursExpanded
                })}
                onClick={this.handleHourExpandClick}
                aria-expanded={this.state.hoursExpanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse
                in={this.state.hoursExpanded}
                timeout="auto"
                unmountOnExit
              >
                <CardContent className={classes.hourContent}>
                  <Typography paragraph>
                    <table>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>{orderedHours[0][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[0][1]}</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>{orderedHours[1][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[1][1]}</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>{orderedHours[2][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[2][1]}</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>{orderedHours[3][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[3][1]}</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>{orderedHours[4][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[4][1]}</td>
                      </tr>
                      <tr className={classes.dayRow}>
                      <td className={classes.dayColumn}>{orderedHours[5][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[5][1]}</td>
                      </tr>
                      <tr className={classes.dayRow}>
                      <td className={classes.dayColumn}>{orderedHours[6][0]}</td>
                        <td className={classes.hoursColumn}>{orderedHours[6][1]}</td>
                      </tr>
                    </table>
                  </Typography>
                </CardContent>
              </Collapse>
            </Typography>
            <Typography paragraph>
              <WebIcon className={classes.materialIcons} /> - Website URL
            </Typography>
            {/* <Typography>
              <DescriptionIcon className={classes.materialIcons} /> -
              Conditional Description
            </Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CardTemplateComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    // category: state.lfS.leftMenu,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // onChange: (event) => dispatch({type: actionTypes.CATEGORY_CHANGE, payload: (event.target.value)})
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(CardTemplateComponent);
