import React, { useState, useEffect } from "react";
import {Container,Box,TextField,Typography} from "@mui/material";
import {Grid,Stack,Button,Chip,} from "@mui/material";
import { setMainContent, setContentTitle } from "./store/reducers/menu";
import { useSelector,useDispatch } from 'react-redux';
import { saveContent } from "./data/fetchData";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import { SERVER_URL } from "./config";
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';
import { CircularProgress } from '@mui/material'; // Import CircularProgress for loading indicator
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import Tooltip from '@mui/material/Tooltip';

// apple banana cherry date elderberry
// fig grape honeydew kiwi lemon
// mango nectarine orange papaya quince
// raspberry strawberry tangerine ugli vanilla
// watermelon apricot blackberry cantaloupe dragonfruit
// eggplant figs grapefruit huckleberry jackfruit
// kumquat lime melon nectar olive
// peach quinoa radish spinach tomato
// zucchini artichoke broccoli carrot daikon
// endive fennel garlic horseradish jalapeno
// kale leek mushroom nori onion
// parsley radicchio squash turnip upland
// vanilla wasabi yam zucchini asparagus
// beet cabbage dill eggplant fennel
// garlic hops iceberg jalapeno kohlrabi
// lemon mangetout napa okra parsnip
// quince rhubarb sorrel taro upland
// vetch watercress xigua yarrow zest




function App() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const {mainContent,contentTitle,uid} = useSelector((state) => state.menu);
  const [singleWord, setSingleWord] = useState("");
  const [rhymings, setRhymings] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [meterText, setMeterText] = useState("");
  const [meterAnalysis, setMeterAnalysis] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Add state for saving status
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false); // State to manage tooltip visibility
const [tooltipWord, setTooltipWord] = useState(""); 


const getRhymings = async () => {
  // Replace with backend call
  const response = await fetch("http://sksbackend.ap-south-1.elasticbeanstalk.com/dbInteractions/getRhymings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      params: {
        word: singleWord, // Replace with dynamic input if needed
        number: 50,
      },
    }),
  });
  const data = await response.json(); // Assuming the response is in JSON format
  console.log(data);
  setRhymings(data); // Update state with the fetched data
};

// const getSynonyms = async () => {
//     // const data = ["moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon"];
//     // setSynonyms(data);
//     const response = await fetch("http://localhost:5214/dbInteractions/getSynonyms", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//        params : {
//           word: singleWord,  
//           threshold: 2      
//        }
//       }),
//     });
//     const data = await response.json(); // Assuming the response is in JSON format
//     console.log(data);
//     setSynonyms(data); 
// };


const getSynonyms = async () => {
  const response = await fetch("http://sksbackend.ap-south-1.elasticbeanstalk.com/dbInteractions/getSynonyms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     params : {
        word: singleWord,  
        threshold: 2      
     }
    }),
  });
  const data = await response.json(); // Assuming the response is in JSON format
  console.log(data);
  
  // Check if synonyms array exists and has at least one entry
  if (data.synonyms && data.synonyms.length > 0) {
      const firstSynonymArray = data.synonyms[0]; // Get the first array of synonyms
      const synonymsList = firstSynonymArray[2]; // Extract the synonyms from the second position
      setSynonyms(synonymsList); // Set the synonyms state with the extracted list
  } else {
      setSynonyms([]); // Set to empty if no synonyms found
  }
};
  
  const getMeteredData = async () => {

    const response = await fetch("http://sksbackend.ap-south-1.elasticbeanstalk.com/dbInteractions/getMeter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: meterText }),
    });

    const backendData = await response.json();

  // Transform backend data to the expected format
  const sampleData = Object.fromEntries(
    Object.entries(backendData).map(([word, segments]) => [
      word,
      Object.fromEntries(segments),
    ])
  );
    // const sampleData = {
    //   "apple": { "app": 1, "ple": 2 },
    //   "banana": { "ba": 2, "na": 1, "na": 1 },
    //   "cherry": { "che": 1, "rry": 2 },
    //   "date": { "da": 1, "te": 1 },
    //   "elderberry": { "eld": 2, "erb": 1, "err": 2 },
    //   "fig": { "fi": 1, "g": 2 },
    //   "grape": { "gra": 2, "pe": 1 },
    //   "honeydew": { "hon": 1, "ey": 2, "dew": 1 },
    //   "kiwi": { "ki": 2, "wi": 1 },
    //   "lemon": { "le": 1, "mon": 2 },
    //   "mango": { "man": 1, "go": 2 },
    //   "nectarine": { "nec": 2, "tar": 1, "ine": 1 },
    //   "orange": { "or": 1, "ange": 2 },
    //   "papaya": { "pa": 1, "pa": 2, "ya": 1 },
    //   "quince": { "qui": 2, "nce": 1 },
    //   "raspberry": { "ras": 1, "pbe": 2, "rry": 1 },
    //   "strawberry": { "st": 2, "raw": 1, "berry": 1 },
    //   "tangerine": { "tan": 1, "ger": 2, "ine": 1 },
    //   "ugli": { "ug": 1, "li": 2 },
    //   "vanilla": { "va": 2, "nil": 1, "la": 1 },
    //   "watermelon": { "wat": 1, "er": 2, "melon": 1 },
    //   "apricot": { "apr": 1, "icot": 2 },
    //   "blackberry": { "bla": 2, "ck": 1, "berry": 1 },
    //   "cantaloupe": { "can": 1, "tal": 2, "oupe": 1 },
    //   "dragonfruit": { "dra": 1, "gon": 2, "fruit": 1 },
    //   "eggplant": { "egg": 2, "plan": 1, "t": 1 },
    //   "figs": { "fi": 1, "gs": 2 },
    //   "grapefruit": { "gra": 1, "pe": 2, "fruit": 1 },
    //   "huckleberry": { "huc": 1, "kle": 2, "berry": 1 },
    //   "jackfruit": { "jac": 2, "k": 1, "fruit": 1 },
    //   "kumquat": { "kum": 1, "quat": 2 },
    //   "lime": { "li": 2, "me": 1 },
    //   "melon": { "me": 1, "lon": 2 },
    //   "nectar": { "nec": 1, "tar": 2 },
    //   "olive": { "ol": 2, "ive": 1 },
    //   "peach": { "pe": 1, "ach": 2 },
    //   "quinoa": { "qui": 1, "no": 2, "a": 1 },
    //   "radish": { "ra": 2, "dish": 1 },
    //   "spinach": { "spi": 1, "nach": 2 },
    //   "tomato": { "to": 1, "ma": 2, "to": 1 },
    //   "zucchini": { "zu": 1, "c": 2, "chini": 1 },
    //   "artichoke": { "art": 2, "ich": 1, "oke": 1 },
    //   "broccoli": { "bro": 1, "cc": 2, "oli": 1 },
    //   "carrot": { "ca": 1, "rrot": 2 },
    //   "daikon": { "da": 2, "ikon": 1 },
    //   "endive": { "en": 1, "dive": 2 },
    //   "fennel": { "fen": 2, "nel": 1 },
    //   "garlic": { "gar": 1, "lic": 2 },
    //   "horseradish": { "hor": 1, "ser": 2, "radish": 1 },
    //   "jalapeno": { "jal": 1, "ape": 2, "no": 1 },
    //   "kale": { "ka": 2, "le": 1 },
    //   "leek": { "lee": 1, "k": 2 },
    //   "mushroom": { "mus": 1, "hroom": 2 },
    //   "nori": { "no": 1, "ri": 2 },
    //   "onion": { "on": 2, "ion": 1 },
    //   "parsley": { "par": 1, "sley": 2 },
    //   "quinoa": { "qui": 1, "no": 2, "a": 1 },
    //   "radicchio": { "ra": 2, "dic": 1, "chio": 1 },
    //   "squash": { "squ": 1, "ash": 2 },
    //   "turnip": { "tur": 1, "nip": 2 },
    //   "upland": { "up": 2, "land": 1 },
    //   "vanilla": { "va": 1, "nil": 2, "la": 1 },
    //   "wasabi": { "wa": 1, "sabi": 2 },
    //   "yam": { "ya": 2, "m": 1 },
    //   "zucchini": { "zu": 1, "c": 2, "chini": 1 },
    //   "asparagus": { "as": 1, "par": 2, "agus": 1 },
    //   "beet": { "be": 2, "et": 1 },
    //   "cabbage": { "ca": 1, "bb": 2, "age": 1 },
    //   "dill": { "di": 1, "ll": 2 },
    //   "eggplant": { "egg": 1, "plan": 2, "t": 1 },
    //   "fennel": { "fen": 2, "nel": 1 },
    //   "garlic": { "gar": 1, "lic": 2 },
    //   "hops": { "ho": 1, "ps": 2 },
    //   "iceberg": { "ice": 1, "berg": 2 },
    //   "jalapeno": { "jal": 1, "ape": 2, "no": 1 },
    //   "kohlrabi": { "koh": 1, "lra": 2, "bi": 1 },
    //   "lemon": { "le": 1, "mon": 2 },
    //   "mangetout": { "man": 1, "ge": 2, "tout": 1 },
    //   "napa": { "na": 2, "pa": 1 },
    //   "okra": { "ok": 1, "ra": 2 },
    //   "parsnip": { "par": 1, "snip": 2 },
    //   "quince": { "qui": 1, "nce": 2 },
    //   "rhubarb": { "rhu": 1, "barb": 2 },
    //   "sorrel": { "so": 1, "rrel": 2 },
    //   "taro": { "ta": 1, "ro": 2 },
    //   "upland": { "up": 1, "land": 2 },
    //   "vetch": { "ve": 2, "tch": 1 },
    //   "watercress": { "wat": 1, "erc": 2, "ress": 1 },
    //   "xigua": { "xi": 1, "gua": 2 },
    //   "yarrow": { "ya": 1, "rrow": 2 },
    //   "zest": { "ze": 1, "st": 2 }
    // };
    const processText = () => {
      const lines = meterText.split('\n'); // Split meterText into lines
      console.log(lines);
      return lines.map((line) => {
        const words = line.split(' '); // Split each line into words
        let lineTotal = 0; // Initialize line total

        if (line.trim() === "") {
          return (
            <Box key={uuidv4()} mb={3}>
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="body1" style={{ height: '20px' }}></Typography> {/* Empty space for empty line */}
              </Box>
            </Box>
          );
        }


        return (
          <Box key={uuidv4()} mb={1}>
            <Box display="flex" flexDirection="column" alignItems="flex-start"> {/* Column for meters and words */}
              <Box display="flex" width="100%"> {/* Flex for meters and words in a row */}
                {words.map((word) => {
                  const meterEntries = sampleData[word] ? Object.entries(sampleData[word]) : [];
                  const meter = meterEntries.map(([segment, value]) => {
                    lineTotal += value; // Accumulate the total for the line
                    //   <Typography
                    //     key={uuidv4()}
                    //     variant="body2" // Adjust the variant as needed
                    //     style={{
                    //       marginRight: 5,
                    //       padding: '2px 5px', // Add some padding for better appearance
                    //     }}
                    //   >
                    //     {`${segment}: ${value}`} {/* Display segment and its value */}
                    //   </Typography>
                    // );
                     return (
                      <Box display="flex" flexDirection="column" alignItems="center"> {/* Align meter and segment vertically */}
                        <Typography
                          key={uuidv4()}
                          variant="body2" // Adjust the variant as needed
                          style={{
                            marginRight: 5,
                            padding: '2px 5px', // Add some padding for better appearance
                          }}
                        >
                          {`${value}`} {/* Display meter value */}
                        </Typography>
                        <Typography
                          key={uuidv4()}
                          variant="body2" // Adjust the variant as needed
                          style={{
                            marginRight: 5,
                            width: value === 2 ? '40px' : '25px',
                            backgroundColor: value === 1 ? '#d1e7dd' : '#f8d7da',
                            border: '1px solid black',
                            textAlign : 'center',
                            padding: '2px 5px', // Add some padding for better appearance
                          }}
                        >
                          {`${segment}`} {/* Display segment */}
                        </Typography>
                      </Box>
                    );
                  });
                  return (
                    <Box key={uuidv4()} display="flex" flexDirection="column" alignItems="center" marginRight={2}> {/* Align meter and word */}
                      <Box display="flex">{meter}</Box> {/* Display meters above the word */}
                      <Typography
                        key={uuidv4()}
                        variant="body1" // Adjust the variant as needed
                        style={{
                          marginRight: 5,
                        }}
                      >
                        {`${word}`} {/* Display word and its total value */}
                      </Typography>
                    </Box>
                  );
                })}
              <Typography 
                variant="body1" 
                style={{ fontWeight: 'bold', marginTop: 20, display: lineTotal === 0 ? 'none' : 'block' }} // Hide if lineTotal is 0 but take space
              >
                {`${lineTotal}`} {/* Display total for the line */}
              </Typography>
              
              </Box>
            </Box>
          </Box>
        );
      });
    };
    setMeterAnalysis(processText());
  };

  useEffect(() => {
    const localContent = sessionStorage.getItem("mainContent");
    const localTitle = sessionStorage.getItem("contentTitle")
    if (localContent) {
      dispatch(setMainContent({ mainContent: localContent }));
    }
    if (localTitle) {
      dispatch(setContentTitle({ contentTitle: localTitle }));
    }
  }, [dispatch]);

  const debouncedSaveContent = debounce(async () => {
    try {
        await saveContent(user.nickname, mainContent, contentTitle, uid);
        setSaveSuccess(true); // Set success state to true
    } catch (error) {
        console.error("Save failed:", error); // Handle error if needed
    } finally {
        setIsSaving(false); // Reset saving state
    }
}, 3000);

  useEffect(() => {
    setIsSaving(true);
    sessionStorage.setItem("mainContent", mainContent);
    sessionStorage.setItem("contentTitle", contentTitle);
    debouncedSaveContent(); 
  }, [mainContent,contentTitle]);



  return (
    <Box>
      <Box sx={{backgroundColor: "rgb(234, 230, 205)"}}>
        <Box sx={{  pt:2, display:'flex', alignItems:'center', justifyContent:'center'}}>
          {isSaving && (
            <Box sx={{mr:2, display:'flex', alignItems:'center'}}>
              <CircularProgress size={20} /> {/* Show loading spinner */}
              Saving... 
            </Box>
          )}
          {saveSuccess && !isSaving && (
            <Box sx={{mr:2, display:'flex', alignItems:'center'}}>
              <CheckCircleIcon color="success" /> {/* Show success icon */}
              Saved successfully! 
            </Box>
          )}
       <TextField 
          variant="outlined"
          placeholder="Enter the title of the poem..."
          value={contentTitle}
          onChange={(e) => dispatch(setContentTitle({contentTitle:e.target.value}))}
          style={{
            width: "30%",
          }}
          InputProps={{
            style: {
                borderRadius: '100px',
                border:'1px solid black',
                backgroundColor: "#f5f5f5",
            }
          }}
          className="centered-text-field"
        />
        </Box>
        <Grid
          container
          style={{
            padding: "18px 12px 0 0 ",
            // backgroundColor: "rgb(234, 230, 205)",
            marginTop: "3px",
            minHeight: "300px",
          }}
        >
          <TextField
            multiline
            rows={15}
            variant="outlined"
            placeholder="Type your main Content here..."
            value={mainContent}
            onChange={(e) => 
              {dispatch(setMainContent({mainContent:e.target.value}))}
            }
            style={{
              width: "55%",
              margin: "0px 10px 20px 20px",
              border:'1px solid black',
              backgroundColor: "#f5f5f5", // A lighter shade of beige that complements the parent's color
            }}
          />
          <Box sx={{ width: "40%", marginLeft: "20px" }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ marginBottom: "10px", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                onClick={getSynonyms}
                sx={{ width: "50%" }}
              >
                Get Synonyms
              </Button>
              <TextField
                variant="outlined"
                placeholder="Enter a word"
                value={singleWord}
                onChange={(e) => {
                  const input = e.target.value;
                  if (!input.includes(" ")) {
                    setSingleWord(input);
                  }
                }}
                InputProps={{
                  style: {
                      border:'1px solid black',
                      backgroundColor: "#f5f5f5",
                  }
                }}
                sx={{ width: "60%", backgroundColor: "#f5f5f5" }}
                className="centered-text-field"
              />
              <Button
                variant="contained"
                onClick={getRhymings}
                sx={{ width: "50%" }}
              >
                Get Rhymings
              </Button>
            </Stack>
            <Box
              sx={{
                marginTop: "10px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                height: "140px",
                border: '1px solid black'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#3f51b5",
                  marginBottom: "5px",
                }}
              >
                Rhymings:
              </Typography>
              {/* <Box sx={{ height: "90px", overflowY: "auto" }}>
  {Object.entries(rhymings).map(([word, meaning], index) => (
    <Tooltip 
      title={tooltipWord === word ? meaning : ""} 
      arrow 
      open={tooltipOpen && tooltipWord === word} // Show tooltip only for the clicked word
      placement="top" // Position the tooltip above the word
    >
      <Chip 
        key={index} 
        label={word} 
        sx={{ margin: "5px", cursor: "pointer" }} 
        onClick={() => {
          setTooltipWord(word); // Set the word for the tooltip
          setTooltipOpen(true); // Open the tooltip
        }}
        onMouseLeave={() => setTooltipOpen(false)} // Close tooltip on mouse leave
      />
    </Tooltip>
  ))}
              </Box> */}
                            <Box sx={{ height: "90px", overflowY: "auto" }}>
  {rhymings.map((item, index) => {
    const [word, meaning] = Object.entries(item)[0]; // Extract the key-value pair from the object
    return (
      <Tooltip 
        key={index}
        title={tooltipWord === word ? meaning : ""} 
        arrow 
        open={tooltipOpen && tooltipWord === word} // Show tooltip only for the clicked word
        placement="top" // Position the tooltip above the word
      >
        <Chip 
          label={word} 
          sx={{ margin: "5px", cursor: "pointer" }} 
          onClick={() => {
            setTooltipWord(word); // Set the word for the tooltip
            setTooltipOpen(true); // Open the tooltip
          }}
          onMouseLeave={() => setTooltipOpen(false)} // Close tooltip on mouse leave
        />
      </Tooltip>
    );
  })}
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "15px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                height: "140px",
                border: '1px solid black'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#3f51b5",
                  marginBottom: "5px",
                }}
              >
                Synonyms:
              </Typography>
              <Box sx={{ height: "90px", overflowY: "auto" }}>
                {synonyms.map((word, index) => (
                  <Chip key={index} label={word} sx={{ margin: "5px" }} />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ padding: "20px",backgroundColor: "lightGrey" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              multiline
              rows={11}
              variant="outlined"
              placeholder="Enter text to check meter..."
              value={meterText}
              onChange={(e) => setMeterText(e.target.value)}
              sx={{ backgroundColor: "#f5f5f5" }}
              InputProps={{
                style: {
                    border:'1px solid black',
                    backgroundColor: "#f5f5f5",
                }
              }}
            />
             <Button
              sx={{mt:1}}
              variant="contained"
              onClick={() => {getMeteredData()}}
            >
              Check Meter
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Box
  fullWidth
  sx={{
    padding: "10px",
    minHeight: "300px",
    maxHeight: "300px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
    border:'1px solid black',
  }}
>
  {meterAnalysis}
            </Box>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;


