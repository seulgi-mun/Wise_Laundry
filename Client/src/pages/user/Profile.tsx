/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './images/logo2.png';
import PasswordModal from './PasswordModal';
import ProfileImgBox from './ProfileImgBox';
import { getNicknamecheck, getUserInfo, putUpdateUserInfo } from '../../store/api/user';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';
import defaultImg from './images/profile-image.png'
import Swal from 'sweetalert2'



const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-content: center;
`

const Logobox = styled.span `
  position: absolute;
  right: 0;
  top: 7vh;

  img {
    height: 25vh;
  }

  @media screen and (max-width: 800px) {
    top: 5vh;
    img {
      height: 12vh;
    }
  }
`

const ImgBox = styled.div `
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: baseline;
  margin-bottom: 5vh;
`

const SmallBox = styled.div `
  min-height: 100vh;
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  .EditPasswordBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    /* color: ${props => props.theme.fontColor}; */
    background-color: ${props => props.theme.inactiveBtnColor};
  }

  .SaveBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
  }

  .logoutBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #f17388;
    color: white;
  }

  @media screen and (max-width: 800px) {
    position: relative;
    /* bottom: 13vh; */

    .EditPasswordBtn {
      border: none;
      width : 100%;
      border-radius: 10px;
      font-size: 1rem;
      color: white;
      background-color: ${props => props.theme.inactiveBtnColor};
      margin-top: 0.5rem;
    }

    .SaveBtn {
      border: none;
      width : 100%;
      border-radius: 10px;
      font-size: 1rem;
      background-color: ${props => props.theme.activeBtnColor};
      color: white;
    }

    .logoutBtn {
      margin-top: 0.5rem;
    }
  }
`

const EditForm = styled.div `
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;

  h1 {
    display: flex;
    margin-bottom: 40px;
    justify-content: center;
    margin-right: 15px;
  }

  .LabelTitle {
    position: relative;
    bottom: 1vh;
    font-size: 0.8rem;
  }

  .LabelTitle2{
    position: relative;
    bottom: 1vh;
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 0;
    /* margin: 0; */
    /* right: 3vw; */
  }

  .BtnPosition {
    margin-top: 1rem;
    flex-flow: column;
    display: flex;
  }

  .BtnPosition2 {
    margin-top: 0.8rem;
    display: flex;
  }

  .SaveBtnBox {
    width: 100%;
  }
  
  .EditPasswordBox {
    width: 100%;
  }

  .logoutBox {
    width: 100%;
    margin-left: 0.8vw;
  }


  @media screen and (max-width: 800px) {

    label {
      font-size: 0.8rem;
    }

    .LabelTitle {
      position: relative;
      /* top: 1vh; */
    }

    .LabelTitle2 {
      font-size: 0.6rem;
    }
    
    h1 {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      margin-left: 2.5vw;
    }

    .EditPasswordBox {
      margin-top: 0;
    }

    .BtnPosition2 {
      display: flex;
      flex-flow: column;
      margin-top: 0;
    }

    .logoutBox {
      
      margin-left: 0;
    }
  }
`

const InputForm = styled.section`
  height: 2vh;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 30px;
  width: 30vw;
  background-color: ${props => props.theme.bgColor};
  color : ${props => props.theme.fontColor};
  align-items: center;

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.fontColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }

  .ConfirmBtn {
    position: relative;
    /* bottom: 0.5rem; */
    border: none;
    width : 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    max-width: 800px;
  }

  @media screen and (max-width: 800px) {
    /* height: 15px; */
    margin-bottom: 1rem;
    /* ???????????? ?????? ?????? ????????? */
    width: 55vw;

    .ConfirmBtn {
      position: relative;
      /* align-items: center; */
      font-size: 0.7rem;
    }

    input {
      font-size: 0.8rem;
      &::placeholder { 
        font-size: 0.8rem;
      }
    }
  }
`

const OriginNick = styled.div `
  height: 2vh;
  padding: 0.8rem;
  /* border: 1px solid #d8d6d6; */
  border-radius: 10px;
  display: flex;
  margin-bottom: 30px;
  width: 30vw;
  background-color: ${props => props.theme.bgColor};
  color : yellowgreen;
  /* color : ${props => props.theme.fontColor}; */
  /* font-weight: bold; */
  align-items: center;
  font-size: 1.3rem;
  justify-content: center;

  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`


const Profile = () => {
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('')
  const [usingNickname, setUsingNickname] = useState('')
  const [nickChecked, setNickChecked] = useState(true)
  const [userChangeBtn, setUserChangeBtn] = useState(false)

  const [profileImg, setProfileImg] = useState('')

  const [modalOn, setModalOn] = useState(false);

  const [file, setFile] = useState<any>();

  const passwordChangeModal = () => {
    if (sessionStorage.getItem('kakao') !== null) {
      Swal.fire({
        icon: 'error',
        text: '????????? ????????? ??????????????? ????????? ??? ????????????',
        confirmButtonText: '??????',
        confirmButtonColor: 'red',
      })
      setModalOn(false);
    } else {
      setModalOn(true);
    }
  }


  // ?????? ?????? ??????
  const updateUser = () => {
      if (!nickChecked) {
        alert('???????????? ????????? ?????????')
      } else {
        setUserChangeBtn(false)
        const formdata = new FormData()
        formdata.append('userUpdateInfo',
          new Blob([
            JSON.stringify({
              'userEmail': user.userEmail,
              'userNick': nickname,
              'password': '',
            })
          ],{type:'application/json'})
        )
        if(file!==undefined){
          formdata.append('file', file)
        }

        putUpdateUserInfo(formdata)
        .then(() => {
          Swal.fire({
            icon: 'success',
            text: '?????????????????????',
            showConfirmButton: false,
            timer: 1000
          })
          getUserInfo()
            .then((res) => {
              const userInfo = {...res};
              delete userInfo.message
              delete userInfo.statusCode
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              setUser(userInfo)
            })
          }
        )
      }
  }

  useEffect(() => {
    const Uuser =JSON.parse(sessionStorage.getItem('userInfo')|| "" )
    if (!!Uuser) {
      setUser(Uuser)
      setNickname(Uuser.userNick)
      let profileImg2 = Uuser.userImg ? `/images/${Uuser.userImg}` : Uuser.kakaoImg
      profileImg2 = profileImg2 || defaultImg
      setProfileImg(profileImg2)
    } else {
      navigate('/login')
    }
  },[])

  const onHandelNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setNickChecked(false)
    if (usingNickname === e.target.value) {
      setNickChecked(true)
    }
  }

  // ????????? ?????? ??????
  const nicknameDuplicationCheck = () => {
    if (nickname.length > 6 || nickname.length < 2) {
      alert('2?????? ?????? 6?????? ????????? ????????? ?????????')
    } else {
      getNicknamecheck(nickname)
      .then((res) => {
        const nickCheckMessage = res.message
        if (nickname) {
          if (nickCheckMessage === 'Unavailable') {
            setNickChecked(false)
            alert('?????? ?????? ??????????????????.')
          } else {
            setNickChecked(true)
            setUsingNickname(nickname)
            alert('?????? ????????? ??????????????????.')
          }
        } else {
          alert('???????????? ????????? ?????????')
          setNickChecked(false)
        }
      })
      .catch((err) => {
        setNickChecked(false)
      })
    }
  }

  // ????????????
  const onLogout = () => {
    sessionStorage.clear()
    Swal.fire({
      icon: 'success',
      text: '???????????? ???????????????',
      showConfirmButton: false,
      timer: 1000
    })
    navigate('/login')
    window.location.reload();
  }

  const startUpdate = () => {
    if (!userChangeBtn) {
      setUserChangeBtn(true)
    }
  }


  return (
    <Wrapper>
      <Logobox>
        <img src={logo} alt="?????????" />
      </Logobox>
      <SmallBox>
        <EditForm>
        {userChangeBtn ? <h1>EDIT</h1> : <h1>Profile</h1>}
          <ImgBox>
            <ProfileImgBox userImg={profileImg} file={file} setFile={setFile} setUserChangeBtn={setUserChangeBtn} />
          </ImgBox>
          <div className='NickBox'>
            <label htmlFor='nickName'>
            {/* <span className='LabelTitle'>?????????</span> */}
            {userChangeBtn ? <span className='LabelTitle'>?????????</span> : <p className='LabelTitle2'>?????????</p>}
            {userChangeBtn ? 
              <InputForm>
                <input type='text' id='nickName'
                  placeholder='???????????? ???????????????'
                  value={nickname}
                  onChange={(e) => onHandelNick(e)}
                />
                <button className='ConfirmBtn' onClick={() => nicknameDuplicationCheck()}>??????</button>
              </InputForm> 
              : <OriginNick>{nickname}</OriginNick>
            }
              
            </label>
          </div>

          <div className='BtnPosition'>
            <div className='SaveBtnBox'>
              {userChangeBtn ? <button className="SaveBtn" onClick={updateUser}>??????</button> : <button className="SaveBtn" onClick={startUpdate}>??????</button>}
              {/* <button className="SaveBtn" onClick={updateUser}>??????</button> */}
            </div>
          </div>
          <div className='BtnPosition2'>
            <div className='EditPasswordBox'>
              <button className="EditPasswordBtn" onClick={passwordChangeModal}>???????????? ??????</button>
            </div>
            <div className='logoutBox'>
              <button className="logoutBtn" onClick={onLogout}>????????????</button>
            </div>
          </div>
        </EditForm>
      </SmallBox>
      {modalOn && <PasswordModal setModalOn={setModalOn} />}
    </Wrapper>
  );
};

export default Profile;