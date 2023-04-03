import react, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import * as loadingData from "./loading.json";
import * as successData from "./success.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";



function App() {

  const [inputImage,setInputImage] = useState(null)
  const [outputImage,setOutputImage] = useState(null)
  const [name,setName] = useState("")
  const [sername, setSername] = useState("")
  const [number, setNumber] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    console.log(event.target.files)
    var fReader = new FileReader()
    fReader.readAsDataURL(event.target.files[0])
    fReader.onloadend = (e) => {
      console.log(e.target.result)
      setInputImage(e.target.result)
    }
    setOutputImage(null)
    }
  const submit = async() => {
    let numbers = number.split(" ")
    console.log(window.location.hostname)

    try{
      setLoading(true)
      const res = await axios.post("http://"+window.location.hostname+":8088/process-image",{image:inputImage, name:name, surname: sername, numbers: numbers })
      
      setOutputImage(res.data.processed_image)
      setLoading(false)
      setSuccess(true)
      setTimeout(() =>{
        setSuccess(false)
      },2000)
      
    }catch(err){
      console.log(err)
      alert("Something is wrong, Plese try again.")
    }
    
  }

  const defaultOptions = {
   loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
  };

  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: successData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <Container>
      <Form className="pt-4">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSername">
        <Form.Label>Sername</Form.Label>
        <Form.Control type="text" placeholder="Enter sername" onChange={(e) => setSername(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Number</Form.Label>
        <Form.Control type="text" placeholder="Enter list of number example(1 2 3)" onChange={(e) => setNumber(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
      <Form.Label> Image </Form.Label>
      <Form.Control type="file" onChange={(e)=>handleChange(e)} />
      </Form.Group>
      
      <Button variant="primary" onClick={() => submit()}>
        Submit
      </Button>
    </Form>
    <Row className='mt-4'>
      <Col>
      <h3 className='text-center mb-2'>Input</h3>
      { inputImage && (
      <img src={inputImage} width="100%" />
      )
}
      </Col>
      <Col>
      <h3 className='text-center mb-2'>Output</h3>
      { outputImage && (
      <img src={outputImage} width="100%" />
      )
}
      </Col>
    </Row>
  
    {loading && (
      
      <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0, 0.5)", top: 0, left: 0}}>
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
      
    )
 }
   {success &&   (
    <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0, 0.5)", top: 0, left: 0}}>
        <Lottie options={defaultOptions2} height={500} width={500} />
      </div>
      ) }
    
    </Container>
  );
}

export default App;
