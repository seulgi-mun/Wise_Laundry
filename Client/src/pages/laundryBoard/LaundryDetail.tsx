import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteLaundry, getLaundryDetail } from '../../store/api/laundry';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';

const Wrapper = styled.article`
  width: 70vw;
  max-width: 1200px;
  min-width: 280px;
  margin: auto;
  margin-top: 1vh;
  background-color: ${props => props.theme.bgColor};
  svg{
    margin: 30px 0;
    font-size: 4vh;
    color: ${props => props.theme.fontColor};
  }
  @media screen and (max-width: 800px) {
    width: 90vw;
  }
  padding-bottom: 20vh;

`
const DetailBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 600px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  border-radius: 10px;
  margin-top: 10vh;
  @media screen and (max-width: 800px) {
    height: auto;
    margin-top: 0;
  }
`
const Top = styled.div`
  display: flex;
  img{
    height: 400px;
    width: 35vw;
    margin-left: 3vw;
    margin-top: 5vh;
  }
  @media screen and (max-width: 800px) {
    display: inline;
    margin: auto;
    img{
      height: 250px;
      width: 90%;
      margin-top: 2vh;
      margin-left: 5vw;
    }
  }
`
const InfoBox = styled.div`
  width: 100%;
  .inform{
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    justify-content: center;
    padding-right: 20px;
  }
  .title{
    text-align: center;
    margin-top: 40px;
    font-size: 1.2rem;
    color : ${props => props.theme.activeBtnColor}
  }
  .content{
    margin-top: 10px;
    margin-left: 20px;
    font-size: 1.3rem;
  }
`
const Info = styled.div`
  margin: auto;
  width: 80%;
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 80%;
  height: 180px;
  overflow-y: auto;
  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
  @media screen and (max-width: 800px) { 
    height: auto;

  }
`
const Label = styled.div`
  color: black;
  height:1rem;
  margin: 10px 5px 0 5px;
  padding: 2px 5px 2px 5px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: #b3eaef;
  align-items: center;
  p{
    margin-top: 1px;
  }
  &:nth-child(1){
    background-color: #cffbb2;
  }
  &:nth-child(2){
    background-color: #90fdec;
  }
  &:nth-child(3){
    background-color: #f4ffac;
  }
  &:nth-child(4){
    background-color: #fea5e6;
  }
  &:nth-child(5){
    background-color: #fdce8d;
  }
  &:nth-child(6){
    background-color: #ccffa8;
  }
  &:nth-child(7){
    background-color: #90faea;
  }
  &:nth-child(8){
    background-color: #eaf69d;
  }
  &:nth-child(9){
    background-color: #fba7e5;
  }
  &:nth-child(10){
    background-color: #ffd59b;
  }
`
const ButtonBox = styled.div`
  width: 70vw;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  button{
    width: 300px;
    border: none;
    border-radius: 10px;
    margin-top: 50px;
    height: 50px;
    font-size:1.1rem;
    cursor: pointer;
    color: white;

  }
  @media screen and (max-width: 800px) { 
    button{
    margin-top: 10px;
    height: 30px;
    width: 150px;
    }
  }
  @media screen and (max-width: 800px) { 
    button{
    margin-top: 10px;
    height: 30px;
    width: 100px;

    }
  }
  .updateBtn{
    background-color:${props => props.theme.activeBtnColor};
    &:hover{
      background-color: ${props=>props.theme.hoverActiveBtnColor};
    }
  }
  .deleteBtn{
    background-color:${props => props.theme.inactiveBtnColor};
    &:hover{
      background-color: ${props=>props.theme.hoverInactiveBtnColor};
    }
  }
`
const Memo = styled.div`
  .mtitle{
    width: 45px;
  }
  margin: auto;
  margin-top: 30px;
  width: 90%;
  display: flex;
  justify-content: center;
  .memo{
    padding-left: 10px;
    height: 70px;
    width: 200px;
    overflow-y: auto;
    word-break:break-all;
  }
`
interface Istate{
  laundry:{
    laundryId: number
    careLabels: {careLabelId: number, careLabelName:string, careLabel:string}[]
    laundryInfo: string[]
    laundryImg: string
    laundryOwnerNick: string
    laundryOwnerId: number
    laundryMemo:string
  }
}

const LaundryDetail = () => {
  const [laundry,setLaundry] = useState<Istate['laundry']>()
  const navigate = useNavigate()
  const {laundryId} = useParams()
  const [user,setUser] = useRecoilState(userState)
  useEffect(()=>{
    getLaundryDetail(Number(laundryId)).then((res)=>{
      setLaundry(res.list)
    })
  },[])
  const imageOnErrorHandler = (
    // 사진이 오류날 시 기본 사진
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      "https://www.pngplay.com/wp-content/uploads/12/Basic-Half-Sleeve-T-Shirt-PNG-Free-File-Download.png";
  };
  const goDelete =()=>{
    Swal.fire({
      title: '정말로 지우시겠습니까?',
      text: "지우면 복구하실 수 없습니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네 지울래요!',
      cancelButtonText:'돌아가기',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '삭제완료!',
          '세탁물이 삭제되었습니다.',
          'success'
          )
          deleteLaundry(Number(laundryId))
          navigate(-1)
        }
    })
  }

 
  
  
  return (
    <Wrapper>
      {laundry !==undefined &&
      <DetailBox>
        <Top>
          <img onError={imageOnErrorHandler} alt='옷사진' src={`/images/${laundry.laundryImg}`} />
          <InfoBox>
            <LabelBox>
              <div className='title'>세탁 주의 사항</div>
              <div className='careLabel'>
              {laundry.careLabels.map((label,idx)=>{
                return(<Label key={idx} className='label'> {label.careLabel}</Label>)})}
              </div>
            </LabelBox>
            <Info>
              <div className='title'>제품 설명 태그</div>
              <div className='inform'>
                {laundry.laundryInfo.map((info,idx)=>{
                  return(
                    <div key={idx} className='content'># {info}</div>
                  )
                })}
              </div>
            </Info>
            <Memo>
              <div className='mtitle'>메모 : </div>
              <div className='memo'>
                {laundry.laundryMemo}
              </div>
            </Memo>
          </InfoBox>
        </Top>
        {user.userId ===laundry.laundryOwnerId &&
        <ButtonBox>
          <button className='updateBtn' onClick={()=>{navigate(`/laundry/${laundryId}/update`)}}>수정하기</button>
          <button className='deleteBtn' 
          onClick={()=>{ goDelete()}}>
            삭제하기</button>
        </ButtonBox>}
      </DetailBox>
      }
    </Wrapper>
  );
};

export default LaundryDetail;