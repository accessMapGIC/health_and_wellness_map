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

const hrs = [
  ['11:00','15:00'],
  ['09:00','17:00'], 
  ['09:00','17:00'],
  ['09:00','17:00'],
  ['09:00','17:00'],
  ['09:00','17:00'],
  ['09:00','15:00']
]

const styles = theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: "#d0ecf4"
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
    switch (time.day()) {
      case 0:
        if(time.isBetween(moment(hrs[0][0], format), moment(hrs[0][1], format))){
          return <CurrentDay className={classes.openNow}>Open Now : {hrs[0][0]} - {hrs[0][1]}</CurrentDay>;
        }else{
          return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
        }
      // case 1:
      //   if(time.isBetween(moment(m[0], format), moment(m[1], format))){
      //     return <CurrentDay className={classes.openNow}>Open Now : {m[0]} - {m[1]}</CurrentDay>;
      //   }else{
      //     return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
      //   }
      // case 2:
      //   if(time.isBetween(moment(t[0], format), moment(t[1], format))){
      //     return <CurrentDay className={classes.openNow}>Open Now : {t[0]} - {t[1]}</CurrentDay>;
      //   }else{
      //     return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
      //   }
      // case 3:
      //   if(time.isBetween(moment(w[0], format), moment(w[1], format))){
      //     return <CurrentDay className={classes.openNow}>Open Now : {w[0]} - {w[1]}</CurrentDay>;
      //   }else{
      //     return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
      //   }
      // case 4:
      //   if(time.isBetween(moment(th[0], format), moment(th[1], format))){
      //     return <CurrentDay className={classes.openNow}>Open Now : {th[0]} - {th[1]}</CurrentDay>;
      //   }else{
      //     return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
      //   }
      // case 5:
      //   if(time.isBetween(moment(f[0], format), moment(f[1], format))){
      //     return <CurrentDay className={classes.openNow}>Open Now : {f[0]} - {f[1]}</CurrentDay>;
      //   }else{
      //     return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
      //   }
      // case 6:
      //   if(time.isBetween(moment(sa[0], format), moment(sa[1], format))){
      //     return <CurrentDay className={classes.openNow}>Open Now : {sa[0]} - {sa[1]}</CurrentDay>;
      //   }else{
      //     return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
      //   }
      default:
        return <CurrentDay className={classes.closed}>Closed</CurrentDay>;
    };
  };

  render() {
    const { classes } = this.props;

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
          
          title="Example Service"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          {/* <IconButton aria-label="Share">
            <ShareIcon />
    </IconButton> */}
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <LocationOnIcon className={classes.materialIcons} /> - Address of
              Service
            </Typography>
            <Typography paragraph>
              <PhoneIcon className={classes.materialIcons} /> - Phone Number of
              Service
            </Typography>
            <Typography paragraph>
              <AccessTimeIcon className={classes.materialIcons} /> - Hours of Service
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
                        <td className={classes.dayColumn}>Sunday</td>
                        <td className={classes.hoursColumn}>11:00-15:00</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>Monday</td>
                        <td className={classes.hoursColumn}>09:00-17:00</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>Tuesday</td>
                        <td className={classes.hoursColumn}>09:00-17:00</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>Wednesday</td>
                        <td className={classes.hoursColumn}>09:00-17:00</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>Thursday</td>
                        <td className={classes.hoursColumn}>09:00-17:00</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>Friday</td>
                        <td className={classes.hoursColumn}>09:00-17:00</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td className={classes.dayColumn}>Saturday</td>
                        <td className={classes.hoursColumn}>11:00-15:00</td>
                      </tr>
                    </table>
                  </Typography>
                </CardContent>
              </Collapse>
            </Typography>
            <Typography paragraph>
              <WebIcon className={classes.materialIcons} /> - Website URL
            </Typography>
            <Typography>
              <DescriptionIcon className={classes.materialIcons} /> -
              Conditional Description
            </Typography>
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
