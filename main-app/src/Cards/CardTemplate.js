import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import WebIcon from '@material-ui/icons/Web';
import DescriptionIcon from '@material-ui/icons/Description'
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: "#d0ecf4"
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
    paddingBottom: "1px",
    marginBottom: '0px',
  },
  active: {
    fontWeight: "bold"
  },
  activeColumn: {
    fontWeight: "bold",
    paddingLeft: '10px'
  },
  dayRow: {
    display: 'block',
    paddingTop: "3px",
    paddingBottom: "3px"
  },
  hoursColumn: {
    paddingLeft: '15px',
  }
});

class CardTemplateComponent extends React.Component {
  state = { expanded: false, hoursExpanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleHourExpandClick = () => {
    this.setState(state => ({ hoursExpanded: !state.hoursExpanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
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
              <AccessTimeIcon className={classes.materialIcons} /> - Open Now:
              XXa.m.- XXa.m.
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
                        <td className={classes.active}>Sunday</td>
                        <td className={classes.activeColumn}>XXa.m.-XXa.m.</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td>Sunday</td>
                        <td className={classes.hoursColumn}>XXa.m.-XXa.m.</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td>Sunday</td>
                        <td className={classes.hoursColumn}>XXa.m.-XXa.m.</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td>Sunday</td>
                        <td className={classes.hoursColumn}>XXa.m.-XXa.m.</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td>Sunday</td>
                        <td className={classes.hoursColumn}>XXa.m.-XXa.m.</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td>Sunday</td>
                        <td className={classes.hoursColumn}>XXa.m.-XXa.m.</td>
                      </tr>
                      <tr className={classes.dayRow}>
                        <td>Sunday</td>
                        <td className={classes.hoursColumn}>XXa.m.-XXa.m.</td>
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
