import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { CgSearch } from 'react-icons/cg';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import {
  WrapControl,
  ControlFilterCate,
  ButtonControlFilter,
  GroupFilterBasic,
  SearchAdvance,
  GroupLinkFilter,
  GroupFilterAdvance,
  CustomerSelect,
} from './CategoryControl.styles';
import {
  LIST_TEACHER,
  LIST_SORT,
  LIST_MAJOR,
} from './../../constants/category.constants';
import { getSubjects } from './../../redux/category.slice';
import { MapOptions, MapOptionsLong } from 'helpers/convert/map-options';
import { getCampuses } from 'features/master-data/redux/master-data.slice';

const CategoryControl = ({ setCategoryName }) => {
  const { url } = useRouteMatch();
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();
  const dataSubject = useCallback(() => {
    dispatch(getSubjects());
  }, [dispatch]);
  const dataCampuse = useCallback(() => {
    dispatch(getCampuses());
  }, [dispatch]);

  useEffect(() => {
    dataSubject();
    dataCampuse();
  }, [dispatch, dataSubject, dataCampuse]);

  const { listSubject } = useSelector((state) => state.category);
  const { listCampus } = useSelector((state) => state.masterData);
  const optionSubject = MapOptionsLong(listSubject);
  const optionListCampus = MapOptions(listCampus);
  const WrapCate = useRef(null);
  const handlePrev = () => {
    const cateSlide = WrapCate.current;
    cateSlide.scrollLeft -= cateSlide.offsetWidth;
    if (cateSlide.scrollLeft <= 0) {
      cateSlide.scrollLeft = 0;
    }
  };

  const handleNext = () => {
    const cateSlide = WrapCate.current;
    cateSlide.scrollLeft += cateSlide.offsetWidth;
    if (cateSlide.scrollLeft > 0) {
      cateSlide.scrollLeft = cateSlide.offsetWidth;
    }
  };

  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#f58f53',
        primary25: '#DEEBFF',
        primary50: '#B2D4FF',
        primary75: '#4C9AFF',
      },
    };
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
  };
;
  return (
    <WrapControl>
      <div className="container">
        <GroupFilterBasic>
          <ControlFilterCate>
            <span className="title-filter">Chọn chuyên ngành</span>
          </ControlFilterCate>
          <GroupLinkFilter>
            <span
              className="btn-carousel btn-prev"
              onClick={() => handlePrev()}
            >
              <AiOutlineLeft />
            </span>
            <span
              className="btn-carousel btn-next"
              onClick={() => handleNext()}
            >
              <AiOutlineRight />
            </span>
            {/* <div className="list-cate" ref={WrapCate}>
              <div className="group-cate">
                <NavLink to={url} className="link-cate">
                  All
                </NavLink>
                 <span  className="link-cate"   onClick={()=>ChangeName("công-nghệ-thông-tin",1)}> Công Nghệ - Thông Tin  </span>
                 <span  className="link-cate"   onClick={()=>ChangeName("kinh-te-kinh-doanh",2)}>  Kinh Tế - Kinh Doanh  </span>
                 <span  className="link-cate"   onClick={()=>ChangeName("thiet-ke-do-hoa", 3)}>  Thiết Kế Đồ Họa  </span>
                 <span  className="link-cate"   onClick={()=>ChangeName("co-khi-tu-dong-hoa",4)}>  Cơ Khí - Tự Động Hóa  </span>
                 <span  className="link-cate"   onClick={()=>ChangeName("my-pham-lam-dep", 5)}>  Mỹ Phẩm Làm Đẹp</span>
                 <span  className="link-cate"   onClick={()=>ChangeName("du-lich-nha-hang-khach-san",6)}>  Du Lịch - Nhà Hàng - Khách Sạn </span>
              </div>
            </div> */}
            <Slider {...settings}>
              {LIST_MAJOR.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={`${url}/${item.nameLink}/${item.id}`}
                    className="link-cate"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </Slider>
          </GroupLinkFilter>

          <ButtonControlFilter
            onClick={() => {
              setIsToggle(!isToggle);
            }}
            className={`${isToggle ? 'active' : ''}`}
          >
            <BsFilter className="icon-filter" />
            <span>Filter</span>
          </ButtonControlFilter>
        </GroupFilterBasic>

        <GroupFilterAdvance
          className={`control-advance ${isToggle ? 'active' : ''}`}
        >
          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Tìm kiếm
            </label>
            <div className="input-group">
              <span className="input-group__icon">
                <CgSearch />
              </span>
              <input
                type="text"
                className="input-filter"
                placeholder="Tên sản phẩm, mã sinh viên..."
              />
            </div>
          </SearchAdvance>
          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Môn học
            </label>
            <CustomerSelect>
              <Select
                options={optionSubject ? optionSubject : []}
                placeholder="Tìm theo môn học"
                theme={customTheme}
              />
            </CustomerSelect>
          </SearchAdvance>

          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Giáo viên
            </label>
            <CustomerSelect>
              <Select
                options={LIST_TEACHER}
                placeholder="Tìm theo giáo viên"
                theme={customTheme}
                noOptionsMessage="le quang son"
              />
            </CustomerSelect>
          </SearchAdvance>
          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Cơ Sở
            </label>
            <CustomerSelect>
              <Select
                options={optionListCampus ? optionListCampus : []}
                placeholder="Tìm theo cơ sở "
                theme={customTheme}
                noOptionsMessage="le quang son"
              />
            </CustomerSelect>
          </SearchAdvance>
          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Xắp xếp
            </label>
            <CustomerSelect>
              <Select
                options={LIST_SORT}
                placeholder="Xắp xếp theo"
                theme={customTheme}
              />
            </CustomerSelect>
          </SearchAdvance>
        </GroupFilterAdvance>
      </div>
    </WrapControl>
  );
};

export default memo(CategoryControl);
