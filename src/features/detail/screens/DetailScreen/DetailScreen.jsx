import React, { memo, useEffect } from 'react';
import Slider from 'react-slick';
import { MdContentPaste } from 'react-icons/md';
import { GoCommentDiscussion } from 'react-icons/go';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import store from 'redux/store';
import { Link } from 'react-router-dom';

import CarouselProduct from './../../components/CarouselProduct/CarouselProduct';

import {
  WrapDetail,
  ListCurrentImg,
  TitleProject,
  GroupMember,
  LabelProject,
  BoxProject,
  GroupDetail,
  GroupBox,
  TitleMain,
  ContentPost,
  GroupFeedback,
  Video,
  GroupContentDetail,
} from './DetailScreen.styles';
import RatingStar from './../../components/RatingStar/RatingStar';
import ShareSocial from './../../components/ShareSocial/ShareSocial';
// import ToolsDetail from './../../components/ToolsDetail/ToolsDetail';
import AttachDoc from './../../components/AttachDoc/AttachDoc';
import RatingDetail from './../../components/Feedback/RatingDetail';
import Feedback from './../../components/Feedback/Feedback';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';

import { getDetailProduct } from './../../redux/detail.slice';
import Loading from 'components/Loading/Loading';
import { getSubjects } from 'features/master-data/redux/master-data.slice';
import { PROFILE_PATHS } from 'features/profile/constants/profile.paths';

const DetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userLogin } = store.getState().auth;
  const { isLoadingDetailProduct, itemDetailProduct, listSubject } =
    useSelector((state) => ({
      itemDetailProduct: state.detailProduct?.itemDetailProduct,
      isLoadingDetailProduct: state.detailProduct?.isLoadingDetailProduct,
      listSubject: state.masterData?.listSubject,
    }));
  document.title = itemDetailProduct?.name;

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const subjectName = listSubject.find(
    (item) => item.id === itemDetailProduct?.subject_id
  )?.code;

  const settings = {
    customPaging: function (i) {
      return (
        <ListCurrentImg>
          <img
            src={itemDetailProduct?.product_galleries[i]?.image_url}
            className="current-slide"
            alt=""
          />
        </ListCurrentImg>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetailProduct(id));
    }
  }, [dispatch, id]);
  // video_url
  if (isLoadingDetailProduct) {
    return <Loading />;
  }

  return (
    <WrapDetail>
      <Breadcrumb
        position={
          !isLoadingDetailProduct && itemDetailProduct
            ? itemDetailProduct?.name
            : ''
        }
      />
      <div className="container">
        {itemDetailProduct ? (
          <>
            {itemDetailProduct.status !== 3 ? (
              // status !=3 chi có thằng đó và giáo viên được xem
              <>
                {userLogin.id === itemDetailProduct.user_id ||
                userLogin.id === itemDetailProduct.teacher_id ? (
                  <>
                    <div className="row">
                      <div className="xl-7 lg-7">
                        <Slider {...settings}>
                          {itemDetailProduct?.product_galleries.map(
                            (item, index) => (
                              <div key={index}>
                                <img
                                  src={item?.image_url}
                                  alt=""
                                  className="image-gallery"
                                />
                              </div>
                            )
                          )}
                        </Slider>
                      </div>
                      <div className="xl-5 lg-5">
                        <div>
                          <TitleProject>{itemDetailProduct?.name}</TitleProject>
                          <GroupMember>
                            <LabelProject>Thành viên nhóm: </LabelProject>
                            <div className="list-member">
                              {itemDetailProduct?.students.map((student) => (
                                <span className="item-member" key={student.id}>
                                  {student.email} - {student.student_code}
                                </span>
                              ))}
                            </div>
                          </GroupMember>
                          <BoxProject>
                            <LabelProject>Khóa:</LabelProject>
                            16.3
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>Giảng viên hướng dẫn:</LabelProject>
                            {itemDetailProduct?.teacher?.name}
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>Chuyên ngành:</LabelProject>
                            Thiết kế website
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>Mã môn học:</LabelProject>
                            PRO2016
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>Kì học:</LabelProject>
                            {itemDetailProduct?.semester?.name}
                          </BoxProject>
                        </div>
                      </div>
                    </div>

                    <GroupDetail>
                      <div className="row">
                        <div className="xl-8">
                          <div className="group-des">
                            <TitleMain>
                              <MdContentPaste />
                              <span>Bài viết giới thiệu</span>
                            </TitleMain>

                            <Video
                              className={
                                itemDetailProduct?.status !== 3 && 'video'
                              }
                            >
                              {itemDetailProduct?.status === 3 ? (
                                <ReactPlayer
                                  width="100%"
                                  className="video"
                                  height="350px"
                                  playing
                                  controls={true}
                                  url={itemDetailProduct?.video_url}
                                />
                              ) : (
                                <div>
                                  <h3>Link video</h3>
                                  <a
                                    href={itemDetailProduct?.video_url}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {itemDetailProduct?.video_url}
                                  </a>
                                </div>
                              )}
                            </Video>
                            <ContentPost
                              dangerouslySetInnerHTML={{
                                __html: itemDetailProduct?.description,
                              }}
                            />

                            <CarouselProduct />
                          </div>
                        </div>
                        <div className="xl-4">
                          <GroupBox>
                            <AttachDoc data={itemDetailProduct} />
                          </GroupBox>
                        </div>
                      </div>
                    </GroupDetail>
                  </>
                ) : (
                  <div className="messenger"> Không tìm thấy sản phẩm ! </div>
                )}
              </>
            ) : (
              // status = 3
              <>
                <div className="row">
                  <div className="xl-7 lg-7 md-12 md-12 col-12">
                    <Slider {...settings}>
                      {itemDetailProduct?.product_galleries.map(
                        (item, index) => (
                          <div key={index}>
                            <img
                              src={item?.image_url}
                              alt=""
                              className="image-gallery"
                            />
                          </div>
                        )
                      )}
                    </Slider>
                  </div>
                  <div className="xl-5 lg-5 md-12 sm-12 col-12">
                    <GroupContentDetail>
                      <TitleProject>{itemDetailProduct?.name}</TitleProject>

                      <RatingStar />

                      <BoxProject>
                        <LabelProject>Cở sở:</LabelProject>
                        {itemDetailProduct?.teacher?.campuses?.name}
                      </BoxProject>
                      <GroupMember>
                        <LabelProject>Thành viên nhóm: </LabelProject>
                        <div className="list-member">
                          {itemDetailProduct?.students.map((student) => (
                            <Link
                              to={PROFILE_PATHS.PROFILE.replace(
                                /:id/,
                                student?.id
                              )}
                              className="item-member"
                              key={student?.id}
                            >
                              {student?.email} - {student?.student_code}
                            </Link>
                          ))}
                        </div>
                      </GroupMember>
                      <BoxProject>
                        <LabelProject>Khóa:</LabelProject>
                        16.3
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>Giảng viên hướng dẫn:</LabelProject>
                        {itemDetailProduct?.teacher?.name}
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>Chuyên ngành:</LabelProject>
                        {itemDetailProduct?.major?.name}
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>Mã môn học:</LabelProject>
                        {subjectName}
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>Kì học:</LabelProject>
                        {itemDetailProduct?.semester?.name}
                      </BoxProject>
                    </GroupContentDetail>
                  </div>
                </div>
                <GroupDetail>
                  <div className="row">
                    <div className="xl-8 lg-8 md-12 sm-12 col-12">
                      <div className="group-des">
                        <TitleMain>
                          <MdContentPaste />
                          <span>Bài viết giới thiệu</span>
                        </TitleMain>

                        <Video>
                          <ReactPlayer
                            width="100%"
                            className="video"
                            height="100%"
                            playing
                            controls={true}
                            url={itemDetailProduct?.video_url}
                          />
                        </Video>
                        <ContentPost
                          dangerouslySetInnerHTML={{
                            __html: itemDetailProduct?.description,
                          }}
                        />

                        <GroupFeedback>
                          <TitleMain>
                            <GoCommentDiscussion />
                            <span>Đánh giá</span>
                          </TitleMain>

                          <RatingDetail />

                          <Feedback />
                        </GroupFeedback>
                        {/* bài viết giới thiệu  */}
                      </div>
                    </div>
                    <div className="xl-4 lg-4 md-12 sm-12 col-12">
                      <div className="group-document">
                        <GroupBox>
                          <AttachDoc data={itemDetailProduct} />
                        </GroupBox>

                        <GroupBox>
                          <ShareSocial />
                        </GroupBox>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <CarouselProduct />
                  </div>
                </GroupDetail>
              </>
            )}
          </>
        ) : (
          <div className="messenger"> Không tìm thấy sản phẩm ! </div>
        )}
      </div>
    </WrapDetail>
  );
};

export default memo(DetailScreen);
