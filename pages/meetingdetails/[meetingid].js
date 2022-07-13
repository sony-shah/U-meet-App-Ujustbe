import React, { useEffect, useState } from "react";
import axios from "axios";
import Meetingdetails from "../../component/meetingdetails/Meetingdetails";
import Header from "../../component/layout/header/Header";
import Link from 'next/link'

function Meetingiddetails({ posts }) {
  const baseUrl = "https://www.ujustbe.com/";
  const [uniqnumber, setUniqnumber] = useState("");
  const [curentDate, setDates] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [disablebtn, setDisablebtn] = useState(false);
  const [meetingId, setmeetingId] = useState(null);
  const [title, settitle] = useState("");
  const [Agenda, setAgenda] = useState(null);
  const [MOM, setMOM] = useState(null);
  const [createdBy, setcreatedBy] = useState(null);
  const [fromUserId, setfromUserId] = useState(null);
  const [meetingDate, setmeetingDate] = useState(null);
  const [toUsersList, settoUsersList] = useState(null);
  const [statustype, setStatustype] = useState(true)
  console.log("post data", posts);


  return (
    // <p>Dynamic Meeting </p>
    <>
      {posts.data ? <Meetingdetails commitHistory={posts.data.meetingList} /> : 
      <>
        <p className="textAline">This Meeting does not exist</p>
        <Link href="/sendinvitation" >
          <a className="donebtn dashboardbtn" >Create New Meeting</a>
        </Link>
      </>
      
      }
      {/* <Meetingdetails commitHistory={posts} /> */}
      <Header />
    </>

  );
}

export default Meetingiddetails;

export async function getServerSideProps({ query }) {
  const { meetingid } = query;
  const res = await fetch("https://api.ujustbe.com/Meeting/details?meetingId=" + meetingid);
  const posts = await res.json()
  console.log("all details", posts);
  return {
    props: {
      posts: posts
    }
  }


}