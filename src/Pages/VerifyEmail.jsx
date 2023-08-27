import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CircularProgress } from "@material-ui/core";

import styled from "styled-components";

const MagTag = styled.div`
  margin: 50px;
  line-height: 40px;

  background-color: rgba(255, 0, 47, 0.2);

  border-radius: 15px;
  box-shadow: 0.5px 1px 3px;
`;
const Mag = styled.span`
  font-size: 15px;
  margin-left: 10px;
  vertical-align: middle;
`;

const TrueMag = styled.span``;

function VerifyEmail() {
  const [searchParams, SetuseSearchParams] = useSearchParams();
  const history = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const emailToken = searchParams.get("emailToken");

  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    (async () => {
      if (emailToken) {
        setIsLoding(true);
        try {
          const response = await publicRequest.post("/auth/verifyemail", {
            emailToken,
          });
          console.log("verifyemail good", response.data.username);
        } catch (err) {
          setErrMsg("email verification failed, invalid toklen!");
        }
        setIsLoding(false);
      } else {
        history("/");
      }
    })();
  }, [emailToken]);
  return (
    <div>
      {isLoding ? (
        <MagTag style={{ backgroundColor: "rgba(0, 255, 17, 0.146)" }}>
          <CircularProgress
            size="1rem"
            style={{
              color: "green",
              verticalAlign: "middle",
              marginLeft: "5px",
            }}
          />
        </MagTag>
      ) : (
        <div>
          {!errMsg ? (
            <MagTag style={{ backgroundColor: "rgba(255, 0, 47, 0.2)" }}>
              <ErrorOutlineIcon
                style={{
                  color: "red",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              />

              <Mag>{errMsg}</Mag>
            </MagTag>
          ) : (
            <MagTag style={{ backgroundColor: "rgba(0, 255, 17, 0.146)" }}>
              <TrueMag>
                <CheckCircleIcon
                  style={{
                    color: "green",
                    verticalAlign: "middle",
                    marginLeft: "5px",
                  }}
                />
                <Mag>
                  The email verification process has been completed
                  successfully. You can now log in using the link
                </Mag>
                <Link
                  to="/login"
                  style={{
                    verticalAlign: "middle",
                    marginLeft: "5px",
                  }}
                >
                  here
                </Link>
              </TrueMag>
            </MagTag>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
