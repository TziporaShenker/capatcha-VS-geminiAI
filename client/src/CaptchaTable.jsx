import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationMenu from "./NavigationMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

const CaptchaTable = () => {
  const [captchaResults, setCaptchaResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCaptchaResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/captchaTable");
        setCaptchaResults(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch captcha results");
        setLoading(false);
      }
    };

    fetchCaptchaResults();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <NavigationMenu />
      <div
        style={{
          marginTop: "80px",
          padding: "10px",
          overflowX: "auto", // פתרון לגלילה בטבלאות גדולות
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            maxWidth: "100%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Table
            style={{
              tableLayout: "fixed", // פריסה קבועה לעמודות
              width: "100%",
            }}
          >
            <TableHead style={{ backgroundColor: "#5b9efc" }}>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "10%",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "15%",
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "25%",
                  }}
                >
                  Prompt
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "25%",
                  }}
                >
                  Gemini Response
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "15%",
                  }}
                >
                  Captcha Success
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {captchaResults.map((result) => (
                <TableRow key={result._id}>
                  <TableCell
                    style={{
                      verticalAlign: "top",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(result.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <img
                      src={`http://localhost:5000/${result.filePath}`}
                      alt="Captcha"
                      style={{
                        maxWidth: "160px",
                        height: "auto",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      verticalAlign: "top",
                      textAlign: "left",
                    }}
                  >
                    {result.prompt}
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      verticalAlign: "top",
                      textAlign: "left",
                    }}
                  >
                    {result.geminiResponse}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", verticalAlign: "top" }}>
                    <Chip
                      label={result.isCaptchaSuccessful ? "Success" : "Failed"}
                      color={result.isCaptchaSuccessful ? "success" : "error"}
                      style={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CaptchaTable;
