import React , { useState, useEffect } from 'react'
import './css/PostFight.css'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

function PostFight(props) {
  
    const [feed, setFeed] = useState([])
    const teamData = []

  useEffect(() => {
      const fetchData = async () => {
        await getFeed()
        await getPlayerTeam()
        await updateCurr()
      }
      fetchData()
  },[])

  const MomentAgo = ({ storedTime }) => {
    const [timeDifference, setTimeDifference] = useState('');
  
    useEffect(() => {
      const calculateTimeDifference = () => {
        const storedDateTime = new Date(storedTime);
        const currentTime = new Date();
  
        const timeDiffInSeconds = Math.floor((currentTime - storedDateTime) / 1000);
  
        if (timeDiffInSeconds < 60) {
          setTimeDifference('moments ago');
        } else if (timeDiffInSeconds < 3600) {
          const minutes = Math.floor(timeDiffInSeconds / 60);
          setTimeDifference(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
        } else if (timeDiffInSeconds < 86400) {
          const hours = Math.floor(timeDiffInSeconds / 3600);
          setTimeDifference(`${hours} hour${hours === 1 ? '' : 's'} ago`);
        } else if (timeDiffInSeconds < 2592000) {
          const days = Math.floor(timeDiffInSeconds / 86400);
          setTimeDifference(`${days} day${days === 1 ? '' : 's'} ago`);
        } else if (timeDiffInSeconds < 31104000) {
          const months = Math.floor(timeDiffInSeconds / 2592000);
          setTimeDifference(`${months} month${months === 1 ? '' : 's'} ago`);
        } else {
          const years = Math.floor(timeDiffInSeconds / 31104000);
          setTimeDifference(`${years} year${years === 1 ? '' : 's'} ago`);
        }
      };
      calculateTimeDifference();
    }, [storedTime]);
  
    return <small>{timeDifference}</small>;
  };

  const getFeed = async () => {
      const response = await fetch("https://lukemon-api-9ec20912cdb1.herokuapp.com/getFeed")
        const data = await response.json()
        for(let i = 0; i < data.length; i++){
          data[i].team_urls = data[i].team_urls.split(',')
        }
        setFeed(data)
  }
  const updateCurr = async () => {
    if(props.token && props.money !== undefined){
      const response = await fetch("https://lukemon-api-9ec20912cdb1.herokuapp.com/updateCurr",{
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`
      },
      body: JSON.stringify({
          tickets: props.tickets,
          money: props.money
      })
      })
    } 
  }

  const getPlayerTeam = async () => {
    const response = await fetch(`https://lukemon-api-9ec20912cdb1.herokuapp.com/getPlayerTeam`,{
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    }) 
      const data = await response.json()
      for(let i = 0; i < data.length; i++){
        teamData[data[i]['onTeam']] = data[i]
      }
      props.setTeam(teamData)
      console.log(data)
    }

  return (
    <div className='postTree'>
      <div className='teamDisplay'>
      {props.team.map((team) => {
        return(
          <img src={team.poke_hash.sprite_url} className='team_urls'/>
        )
        })}
      </div>
      <div className='postContainer'>
        
        {feed.map((feed) => {
          return(
          <div className='postedFight'>
            <div className='profileContainer'>
            <div className='profilePic'
            style={{
              backgroundImage: `url(${feed.user_img})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '50px'
            }}/>
            
            <h2>{feed.username}</h2>
            </div>
            <h4>{feed.caption}</h4>
            <ul>
              {feed.team_urls.map((urls) => {
                return(
                  <img className='team_urls' src={urls}/>
                )
              })}
            </ul>
            <p><MomentAgo storedTime={feed.date_created} /></p>
            <Link to={`/lukefight/${feed.user_id}`} className='fightBtn'>
            <div>FIGHT!</div>
            </Link>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostFight