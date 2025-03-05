import jwt from "jsonwebtoken";
export async function validateStudentCookie(req) {
  try {
    const studentCookie = req.cookies.student;
    const decodedCookie =  jwt.verify(studentCookie, "student");
    //  console.log(decodedCookie);
    if (decodedCookie) {
      return decodedCookie;
    }
    return null;
  } catch (error) {
    return null
  }
}

export async function validateInstructorCookie(req) {
  try {
    const instructorCookie = req.cookies.instructor;
    const decodedCookie = jwt.verify(instructorCookie, "instructor");
    //  console.log(decodedCookie);
    if (decodedCookie) {
      return decodedCookie;
    }
    return null;
  } catch (error) {
    return null
  }
}

export async function validateAdminCookie(req) {
  try {
    const adminCookie = req.cookies.admin;
    const decodedCookie = jwt.verify(adminCookie, "admin");
    if (decodedCookie) {
      return decodedCookie;
    }
    return null;
  } catch (error) {
    return null
  }
}
