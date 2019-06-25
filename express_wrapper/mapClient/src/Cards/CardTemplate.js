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
import PinDropIcon from '@material-ui/icons/PinDrop';
import PhoneIcon from '@material-ui/icons/Phone';
import WebIcon from '@material-ui/icons/Web';
import DescriptionIcon from '@material-ui/icons/Description'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';

// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({
  en: english.cardStrings,
  fr: french.cardStrings
});

const styles = theme => ({
  card: {//styling for each card
    maxWidth: 400,
    backgroundColor: "#d0ecf4",
    marginLeft: '2px',
    marginRight: '2px',
    marginBottom: '10px',
    marginTop: '10px',

  },//styling for the active card
  activeCard: {
    maxWidth: 400,
    backgroundColor: "#d0ecf4",
    marginLeft: '2px',
    marginRight: '2px',
    marginBottom: '10px',
    marginTop: '10px',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: '#1d424a',
  },
  cardHeader: {//styling for the card headers
    paddingBottom: '0px !important',
  },
  activeCardHeader: {//styling for the activeCard's Headers
    wontWeight: 'bold',
  },
  openNow: {//styling for openNow
    color: '#00ff00',
  },
  closed: {//styling for closed
    color: '#ff0000',
  },
  media: {//styling for media
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {//styling for actions
    display: "flex"
  },
  expand: {//styling for the expand bottom
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {//styling for the expand button once opened
    transform: "rotate(180deg)"
  },
  hoursExpand: {//styling for the hours expand button unopened
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    padding: "0px"
  },
  hoursExpandOpen: {//styling for the hours expand button once opened
    transform: "rotate(180deg)",
    padding: "0px"
  },
  avatar: {//stlying for the avatar
    backgroundColor: red[500]
  },
  materialIcons: {//styling for any of the material icons
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "-35%"
  },
  hourContent: {//styling for the block of hours
    display: 'block',
    paddingLeft: "31px",
    paddingBottom: "1px !important",
    marginBottom: '0px',
  },
  active: {//styling for the active day hours
    display: 'inline-block',
    fontWeight: "bold",
    width: '77px',
  },
  activeColumn: {//styling for the active column
    display: 'inline-block',
    fontWeight: "bold",
    paddingLeft: '10px'
  },
  dayRow: {//stlying for each row
    display: 'inline-block',
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  hoursColumn: {//styling for the hour column
    display: 'inline-block',
    paddingLeft: '10px',
  },
  dayColumn: {//styling for the day column
    display: 'inline-block',
    width: '77px',
    // fontWeight: bold,
  }
});

class CardTemplateComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false, //is the regular card expanded
      hoursExpanded: false, //are the hours expanded,
      notesExpanded: false
    };
  }

  componentDidMount() { //load the information for the card from the card container
    this.props.addCard(this.props.title, this.props.address, this.props.service_id, this.props.x, this.props.y);
    strings.setLanguage(this.props.language);
  }

  componentDidUpdate(prevProp) {
    if (this.props.language !== prevProp.language) {
      strings.setLanguage(this.props.language);
      this.forceUpdate();
    }
  }

  handleActivation = () => {
    this.props.activateCard(this.props.service_id);
    this.props.activatePoint(this.props.service_id);
  }//this handles activating the appropriate Point and Card for the user

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };//expand onclick method

  handleHourExpandClick = () => {
    this.setState(state => ({ hoursExpanded: !state.hoursExpanded }));
  };//hours expand onclick

  handleNotesExpandClick = () => {
    this.setState(state => ({ notesExpanded: !state.notesExpanded }));
  };

  handleCurrentDay = (hrs) => {
    const format = 'hh:mm';
    const time = moment();
    const curDay = new Array(0);

    if(hrs[time.day()][0] === 'NA'){
      curDay[0] = strings.unknown;
    } else if(hrs[time.day()][0]) {
      let range = hrs[time.day()][0].split("-");
      curDay[0] = strings.closed;
      if(time.isBetween(moment(range[0], format), moment(range[1], format))) {
        curDay[0] = strings.open;
      }
    } else{
      curDay[0] = strings.unknown;
    }
    return curDay;
  };//calculates if the service is opened or closed

  getDayOrder(){
    const time = moment();
    switch(time.day()){
      case 0: //Translate
        return [[0, strings.sun],[1,strings.mon],[2,strings.tue],[3, strings.wed],[4, strings.thu],[5, strings.fri],[6, strings.sat]];
      case 1:
        return [[1, strings.mon],[2, strings.tue],[3, strings.wed],[4, strings.thu],[5, strings.fri],[6, strings.sat],[0, strings.sun]];
      case 2:
       return [[2, strings.tue],[3, strings.wed],[4, strings.thu],[5, strings.fri],[6, strings.sat],[0, strings.sun],[1,strings.mon]];
      case 3:
        return [[3,strings.wed],[4, strings.thu],[5, strings.fri],[6, strings.sat],[0, strings.sun],[1, strings.mon],[2, strings.tue]];
      case 4:
        return [[4, strings.thu],[5, strings.fri],[6, strings.sat],[0, strings.sun],[1, strings.mon],[2, strings.tue],[3, strings.wed]];
      case 5:
        return [[5, strings.fri],[6, strings.sat],[0, strings.sun],[1, strings.mon],[2, strings.tue],[3, strings.wed],[4, strings.thu]];
      case 6:
        return [[6, strings.sat],[0, strings.sun],[1, strings.mon],[2, strings.tue],[3, strings.wed],[4, strings.thu],[5, strings.fri]];
      default:
        return ['There was a Problem'];
    }
  }//calculates which day of the week it is

  reOrderHours(hours){
    const curOrder = this.getDayOrder();
    const newArr = new Array(7);
    for(var i = 0; i<curOrder.length; i++){
      if(hours[curOrder[i][0]][0]==='NA'){
        newArr[i]=[curOrder[i][1], strings.closed];
      }else{
        newArr[i]=[curOrder[i][1], hours[curOrder[i][0]][0]];
        // the line below seems to follow an older format
        // newArr[i]=[curOrder[i][1], hours[curOrder[i][0]][0] + '-' + hours[curOrder[i][0]][1]];
      }
    }
    return newArr;
  }//adds the apropriate hours to the day order

  render() {
    const { classes, openNow } = this.props;
    const orderedHours = this.reOrderHours(this.props.hours);
    const curDay = this.handleCurrentDay(this.props.hours);
    if (openNow && curDay && curDay[0] === strings.closed) {
      return null;
    }

    return (
      <Card className={this.props.activeCard === this.props.service_id ? classes.activeCard : classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <IconButton
              onClick={this.handleActivation}
            >
              <PinDropIcon/>
            </IconButton>
          }
          action={
            <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon className={classes.materialIcons} />
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
              <WebIcon className={classes.materialIcons} /> - <a href={this.props.url} target="_blank" rel="noopener noreferrer" >Link to their website</a>
            </Typography>
            {
              this.props.notes ?  (
                <Typography>
                <DescriptionIcon className={classes.materialIcons} /> - Notes
                <IconButton
                  className={classnames(classes.hoursExpand, {
                    [classes.hoursExpandOpen]: this.state.notesExpanded
                  })}
                  onClick={this.handleNotesExpandClick}
                  aria-expanded={this.state.notesExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Collapse
                  in={this.state.notesExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  {this.props.notes}
                </Collapse>
              </Typography>
              ) : null
            }
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
    activeCard: state.rtS.rightMenu.activeCard,
    cards: state.rtS.rightMenu.cards,
    openNow: state.lfS.leftMenu.openNow,
    language: state.lang.language
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addCard: (title, address, service_id, x, y, ref) => dispatch({
      type: actionTypes.ADD_CARD,
      payload: {
        title: title,
        address: address,
        service_id: service_id,
        x: x,
        y: y,
      }
    }),
    activateCard: (service_id) => dispatch ({
      type: actionTypes.ACTIVATE_CARD,
      payload: service_id
    }),
    activatePoint: (service_id) => dispatch ({
      type: actionTypes.ACTIVATE_POINT,
      payload: service_id
    })
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(CardTemplateComponent);
