import React, { useEffect, useState, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import CourseCard from "../../../../module/card/course_card/CourseCard"
import { getCoursePagination } from "../../../../../api/course_api"
import { CourseContext } from "../../../../../context/courseContext"
import PublishMasterPage from "../../../master_page/PublishMasterPage"
import ReactPaginate from 'react-paginate';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const CoursePagination = () => {
  const { courses, setCourses} = useContext(CourseContext)
  const [page, setPage] = useState(1)
  const [totalCourses, setTotalCourses] = useState(1)


  useEffect(() => {
    getCoursePagination(page).then((res) => {
      setCourses(res.data.courses)
      setTotalCourses(res.data.totalCourses)
    })
  }, [page, setCourses])

  return (
    <PublishMasterPage>
      <div style={{ margin: "30px 0" }} className="coursePagination">
        <Container>
          <Row className="g-4">
            {courses.map((item) => (
              <Col sm={6} md={4} lg={3} key={item._id}>
                <CourseCard item={item} />
              </Col>
            ))}
          </Row>
          <Row>
            <div className="pagination">
            <ReactPaginate 
            previousLabel={<GrLinkPrevious className='pagination-prev-btn'/>}
            nextLabel={<GrLinkNext className='pagination-next-btn'/>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalCourses / 12}
            marginPagesDisplayed={3}
            pageRangeDisplayed={5}
            onPageChange={(data) => setPage(data.selected + 1)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName='pagination-item'
            />
            </div>
          </Row>
        </Container>
      </div>
    </PublishMasterPage>
  )
}

export default CoursePagination
