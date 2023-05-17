import Item from "./item"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

    return (
        <Container>
            <Row>
                <Col>
                    <Item 
                        imgURL="https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg"
                        title="Nike Air Jordan"
                        price="$250"
                        location="Los Angeles, CA"
                />
                </Col>
                <Col>
                    <Item 
                            imgURL="https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg"
                            title="Nike Air Jordan"
                            price="$250"
                            location="Los Angeles, CA"
                    />
                </Col>
                <Col>
                    <Item 
                            imgURL="https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg"
                            title="Nike Air Jordan"
                            price="$250"
                            location="Los Angeles, CA"
                    />
                </Col>
                <Col>
                    <Item 
                            imgURL="https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg"
                            title="Nike Air Jordan"
                            price="$250"
                            location="Los Angeles, CA"
                    />
                </Col>
            </Row>
        </Container>
          
    );

}

export default Home;