import React, { useEffect, useRef, useState } from "react";
import Selectinviteecontroller from "../selectinvite/Selectinvitee.controller";
import styles from "../../styles/Listing.module.scss";

function Search(props) {
  //const propsdata = props.data.partner
  const [value, setValue] = useState("");
  const [noitem, setnoitem] = useState([]);
  const [fromUserId, setfromUserId] = useState(null);
  const divRef = useRef(null);
  const [nodata, setNodata] = useState(20);
  const [message, setMessage] = useState("not at bottom");
  const [height, setheight] = useState(window.innerHeight)

  // function emptystate() {
  //   setnoitem([]);
  // }

  function savedata() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data);
    setfromUserId(MessageList.data._id);
    setMessage("test");
    ///props.loadmore(0);
    props.currentcount(props.data.currentcount + 1)
  }
  console.log("inner listing data", props.data.currentcount, "total count", props.data.totalcount);

  function handleScroll() {
    //setMessage('bottom reached')
    //console.log("scroll");

    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setMessage('bottom reached')

      // this.setState({
      //     message: 'bottom reached'
      // });

      console.log(props.data.totalcount);
      if (props.data.currentcount < props.data.totalcount) {

        props.loadmore(nodata);

        console.log("true");
        console.log(nodata);
        setNodata(nodata + 20)
        props.currentcount(nodata + 20);
      }
      else {
        console.log("false");
        console.log(nodata);
      }


    } else {
      setMessage('not at bottom')
      // this.setState({
      //     message: 'not at bottom'
      // });
    }
  }
  useEffect(() => {
    savedata();
  }, []);

  return (
    console.log("inner data", props.data),
    (
      //console.log(noitem),
      <>



        <div className={styles.searchBox}>
          {props.data.businesslist.length > 0 ? <p>Total Partners : {props.data.totalcount}</p> : null}


          {/* auto complete */}
          <div className={styles.autocompleteBox}>
            <ul>
              {props.data.businesslist.length > 0 ? (
                props.data.businesslist
                  .filter((item) => {
                    if (!value) return true;
                    if (
                      item.businessName.includes(value) ||
                      item.businessName.includes(value)
                      //item.address.location.includes(value)
                    ) {
                      return true;
                    }
                  })
                  .map((item, i) => (
                    //console.log(item),
                    <li key={i}>
                      {item.businessName}
                    </li>
                  ))
              ) : (
                <p>Test</p>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <ul>
            {/* {props.data.selectedpartner.find((product) => {
              return product.userid((item) => {
                //^^^^^^
                return console.log("test", item);
                //return item.userid === 'milk';
              });
            })} */}
            {props.data.businesslist.length > 0 ? (
              props.data.businesslist
                .filter((item) => {
                  if (!value) return true;
                  if (
                    //item.firstName.toLowerCase().includes(value) ||
                    item.businessName.toLowerCase().includes(value) ||
                    item.businessName.toUpperCase().includes(value)
                    //item.categories.map().toUpperCase().includes(value)
                  ) {
                    return true;
                  }
                })
                .map((item, i) => (
                  //console.log(item),
                  <li
                    className={
                      props.data.selectedpartner.indexOf(item.userId) !== -1
                        ? `${styles.listingCard} ${styles.selected}`
                        : styles.listingCard && fromUserId === item.userId ? `${styles.listingCard} ${styles.hidecard}` : styles.listingCard
                    }
                    key={i}
                  >
                    <div className={styles.profileimage}>
                      {item.logo.logoImageURL ?
                        <img
                          src={
                            "https://api.ujustbe.com/" +
                            item.logo.logoImageURL
                          }
                        /> : <p>NO img</p>
                      }
                    </div>

                    <div className={styles.description}>
                      <div className={styles.buzcategory}>
                        {item.categories.map((cats) => <span>{cats}</span>)}
                      </div>
                      <h2>{item.businessName}</h2>
                      <h4>{item.role}</h4>
                      <h6>
                        {/* <img src="/images/add-icon.png" /> */}
                        {/* {item.address.flat_Wing} {item.address.locality}{" "} */}
                        {item.address.location}
                      </h6>
                      
                      <div className={styles.actionbtn}>
                       
                        <button
                            //onClick={() => props.onaddToInvitationBox(item)}
                            onClick={() => {
                              props.onaddToInvitationBox(item);
                              props.sendmeeting({
                                userId: item.userId,
                                status: "null",
                              });
                            }}
                          >
                            Send Invitation
                          </button>
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <>
                {props.data.loading ? <p>Loading</p> : <p>No records found</p>}
              </>
            )}
          </ul>
          {/* <button>{nodata}</button> */}
          {/* {props.data.totalcount > counter?
            <button onClick={() => {
              currentloaded();
              props.loadmore(counter);
            }}>Load More {props.data.totalcount - counter}</button>:null
          } */}
        </div>

      </>
    )
  );
}

export default Search;