import { useEffect, useState } from "react";
import fetchCourses from "../pages/api/fetchCourses";
import { Course } from "../interfaces/course";
import {
  Container,
  HContainer,
  CContainer,
  CardContainer,
  IContainer,
  DContainer,
  TextDiv,
  APContainer,
} from "./styled/LatestCourse.styled";

const LatestCourses = () => {
  const [course, setCourse] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callFetchCourse();
  }, []);

  const callFetchCourse = async () => {
    const courses = await fetchCourses();
    setCourse(courses);
    setLoading(true);
  };

  if (loading && !course.length) {
  }

  return (
    <Container>
      <HContainer>
        <h1>Latest Courses</h1>
      </HContainer>
      <CContainer>
        {loading && !course.length ? (
          <h1>There are no courses publishesd yet!</h1>
        ) : (
          course.map((c, i) => (
            <CardContainer key={i}>
              <IContainer>
                <img src={c.thumbnail} alt="Course Thumbnail" />
              </IContainer>
              <DContainer>
                <TextDiv>{c.title}</TextDiv>
                <APContainer>
                  <TextDiv>{c.author}</TextDiv>
                  <TextDiv>{c.price}</TextDiv>
                </APContainer>
              </DContainer>
            </CardContainer>
          ))
        )}
      </CContainer>
    </Container>
  );
};

export default LatestCourses;
