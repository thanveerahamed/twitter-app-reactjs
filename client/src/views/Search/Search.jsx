import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import './Search.css';
import axios from "axios";
import { AppUrls } from "../../configurations/app-contants";
import { Button } from "@material-ui/core";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      timelineData: [],
      loading: false,
      searchtext: ''
    }
  }

  componentWillMount() {

  }

  searchText() {
    this.setState({
      loading: true
    })

    let data = {
      search: this.state.searchtext
    }

    axios.post(AppUrls.Search, data).then(response => {
      this.setState({
        loading: false,
        timelineData: response.data.data.statuses
      })
    }).catch(response => {
      console.error(response);
      alert('Error occured');
      this.setState({
        loading: false
      })
    })
  }

  favouritePost(post) {
    let data = {
      id: post.id,
      state: post.favorited ? 'destroy' : 'create'
    }

    axios.post(AppUrls.Favorite, data).then(response => {
      post.favorited = !post.favorited
    }).catch(response => {
      console.error(response);
      alert('Error occured');
    })
  }

  retweetPost(post) {
    let data = {
      id: post.id
    }

    axios.post(AppUrls.Retweet, data).then(response => {
      post.retweeted = true;
    }).catch(response => {
      console.error(response);
      alert('Error occured');
    })
  }

  render() {
    const { timelineData, searchtext } = this.state;

    return (
      <div>

        <div className="body-content">
          <TextField
            id="standard-name"
            label="Search text"
            value={searchtext}
            onChange={(event) => this.setState({ searchtext: event.target.value })}
            margin="normal"
          />
          <Button className="button" variant="contained" color="primary" onClick={() => this.searchText()} >
            Search
      </Button>
          {
            timelineData.length === 0 && <p>No data.</p>
          }
          {
            timelineData.map((timeline, key) => {
              return <Card key={key} className="card" >
                <CardHeader
                  avatar={
                    <Avatar alt={timeline.user.name} src={timeline.user.profile_image_url_https} />
                  }
                  title={<div>{
                    timeline.user.name
                  } <small>{
                    new Date(timeline.created_at).toLocaleString()
                  }</small> </div>}
                  subheader={timeline.text}
                />
                {
                  timeline.extended_entities && timeline.extended_entities.media &&
                  <img style={{ width: "100%" }} alt="" src={timeline.extended_entities.media[0].media_url} />
                }

                <CardActions disableSpacing>
                  <Button onClick={() => this.favouritePost(timeline)} color={timeline.favorited ? "secondary" : "inherit"} aria-label="Add to favorites">
                    <Icon>favorite</Icon> {timeline.favorite_count}
                  </Button>
                  <Button onClick={() => this.retweetPost(timeline)} color={timeline.retweeted ? "secondary" : "inherit"} aria-label="Add to favorites">
                    <Icon>share</Icon> {timeline.retweet_count}
                  </Button>
                </CardActions>
              </Card>
            })
          }
        </div>
      </div>
    )
  };
}