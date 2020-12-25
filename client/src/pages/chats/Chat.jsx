import React from 'react'
import { Row, Col, Form, Button, Input } from "antd"
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from "@apollo/client"
import Messages from "./components/Messages"
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
	uri: `ws://localhost:4000/`,
	options: {
		reconnect: true
	}
})

const client = new ApolloClient({
	link,
	uri: `http://localhost:4000/`,
	cache: new InMemoryCache()
})

const POST_MESSAGE = gql`
    mutation ($user:String!, $content:String!){
        postMessage(user: $user, content: $content)
    }
  `

const Chat = () => {

	const user = "Jack"
	const [form] = Form.useForm()

	const [postMessage] = useMutation(POST_MESSAGE)

	const onFinish = (values) => {
		if (values.content.length > 0) {
			postMessage({ variables: values })
		}
		form.resetFields();
	}

	return (
		<Row justify="center" style={{ marginTop: "1rem" }}>
			<Col xs={23} lg={16}>
				<Messages user={user} />
				<Form form={form} name="control-hooks" onFinish={onFinish}>
					<Row gutter={[16, 16]} justify="center">
						<Col lg={4}>
							<Form.Item noStyle name="user">
								<Input />
							</Form.Item>
						</Col>
						<Col lg={16}>
							<Form.Item noStyle name="content">
								<Input />
							</Form.Item>
						</Col>
						<Col lg={4}>
							<Button style={{ width: "100%" }} type="primary" htmlType="submit">Submit</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	)
}

export default () => (
	<ApolloProvider client={client}>
		<Chat />
	</ApolloProvider>
)