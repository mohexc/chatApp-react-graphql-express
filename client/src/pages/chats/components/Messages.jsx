import React from 'react'
import { Row, Avatar } from "antd"
import { useSubscription, gql, } from "@apollo/client"


const GET_MESSAGES = gql`
subscription {
    messages{
      id
      content
      user
  }`

const Messages = ({ user }) => {
    const { data } = useSubscription(GET_MESSAGES)
    console.log(data)
    debugger
    if (!data) {
        return null
    }
    return (

        <React.Fragment>
            {
                data.messages.map(({ id, user: messageUser, content }) => (

                    <Row justify={user === messageUser ? "end" : "start"} align="middle">
                        <Avatar style={{ margin: "1rem" }} size={40}>{messageUser}</Avatar>
                        <div style={{
                            background: user === messageUser ? "#58bf56" : "#e5e6ea",
                            color: user === messageUser ? "white" : "black",
                            padding: "1rem",
                            borderRadius: "1em",
                            maxWidth: "60%"
                        }}>{content}
                        </div>
                    </Row>
                ))
            }

        </React.Fragment>
    )
}

export default Messages
