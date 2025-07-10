import { getCookie } from "cookies-next";
import { logger } from "@/logger";
const Auth = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    // console.log(res);
    // const data = res.status;
    logger.info("res");
    if (res.status == 200) {
      // return NextResponse.next();
    }
    // console.log(data);
    // if (data.success) {

    // }
  } catch (error) {
    console.log(error);
    //  return NextResponse.redirect(new URL("/signin", request.url));
  }
};

export default Auth;
