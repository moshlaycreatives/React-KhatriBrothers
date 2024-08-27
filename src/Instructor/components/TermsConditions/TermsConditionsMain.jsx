import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const TermsConditionsMain = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: "2rem",
          }}
        >
          Terms & Conditions
        </Typography>

        <br />

        <Box>
          <br />
          <Typography sx={{ fontWeight: "600", fontSize: "1.1rem" }}>
            1. Acceptance of Terms
          </Typography>

          <Typography sx={{ color: "grey" }}>
            Welcome to Khatri Brothers Academy”. These Terms of Service govern
            your use of the academy and its services and also serve as our
            privacy policy. By accessing or using our website, you agree to
            comply with and be bound by these Terms. If you do not agree to
            these Terms, please do not use our website. These terms also include
            guidelines, additional or supplemental terms, policies, and
            disclaimers that may be made available or issued by us from time to
            time.
          </Typography>
          <br />

          <Typography sx={{ fontWeight: "600", fontSize: "1.1rem" }}>
            2. Registration Process and Account Security
          </Typography>

          <Typography sx={{ color: "grey" }}>
            To access certain features of our website, you may need to register
            for an account. The registration process is briefly explained on the
            website. It is your responsibility to maintain the confidentiality
            of your account credentials and to monitor all activities that occur
            under your account. If you experience any issues with the use of
            your account, you agree to promptly notify us of any unauthorized
            use of your account or any other security breach. Otherwise, we
            cannot be held responsible for any problems you encounter while
            using your account on our website.
          </Typography>
          <br />

          <Typography sx={{ fontWeight: "600", fontSize: "1.1rem" }}>
            3. Use of our Services
          </Typography>

          <Typography sx={{ color: "grey" }}>
            You agree to use the services that we offer through our website only
            for lawful purposes and by these Terms. Please take a moment to
            review all the legal limitations associated with the use of our
            website. We do not condone the use of our website for any unlawful
            purpose. You must not use our website in any way that causes or may
            cause, damage to the website or impairment of the availability or
            accessibility of the website.
          </Typography>
          <br />

          <Typography sx={{ fontWeight: "600" }}>
            4. Intellectual Property
          </Typography>

          <Typography sx={{ color: "grey" }}>
            The content published on our website, including text, graphics,
            logos, images, audio clips, and software, is the property of Khatri
            Brothers Academy and is protected by copyright, trademark, and other
            intellectual property laws. We have the right to ensure the security
            of the content on our website. Students may not share or distribute
            these materials without written permission. You may not use,
            reproduce, modify, or distribute any of the content without our
            prior written consent.
          </Typography>
          <br />

          <Typography sx={{ fontWeight: "600" }}>
            5. User-submitted Content
          </Typography>

          <Typography sx={{ color: "grey" }}>
            By creating an account or enrolling on our website, you may have the
            opportunity to submit, post, or display content such as comments,
            reviews, and messages (referred to as User Submitted Content). By
            posting User Content, you grant us a non-exclusive, perpetual,
            irrevocable, and fully sublicensable right to use this content. This
            means we can reproduce, modify, adapt, publish, translate, create
            derivative works, distribute, and display the User Submitted Content
            worldwide in any form of media.
          </Typography>
          <br />

          <Typography sx={{ fontWeight: "600" }}>6. Termination</Typography>

          <Typography sx={{ color: "grey" }}>
            We reserve the right to terminate or suspend your account and access
            to our services on our website without notice. We are not obligated
            to notify you if we have reason to believe that you have violated
            our terms, in which case we may suspend your account immediately.
            The academy also reserves the right to terminate enrollment for
            non-payment of fees, repeated absence, or violation of these terms.
            This includes conduct that we believe violates these terms or is
            harmful to other users of the website or us.
          </Typography>

          <br />

          <Typography sx={{ fontWeight: "600" }}>
            7. Limitation of Liability
          </Typography>

          <Typography sx={{ color: "grey" }}>
            Khatri Brothers Academy is not responsible for any tangible
            (physical losses) or intangible (non-physical losses) whether direct
            or indirect or in the case of special or consequential incidents.
            This includes lost profits, punitive damages, goodwill, and the use
            of data, arising from your use of the website or its services. The
            Academy will only be liable for losses that are specifically defined
            in the contract. The academy is only responsible for damages that
            are mentioned in the terms, and individuals are not able to seek
            damages beyond those terms.
          </Typography>

          <br />

          <Typography sx={{ fontWeight: "600" }}>8. Governing Law</Typography>

          <Typography sx={{ color: "grey" }}>
            The terms and SOPs mentioned on the website are designed under the
            eyes of the law that is practiced in India. These Terms shall be
            governed by and construed by the laws of India, without regard to
            its conflict of law principles.
          </Typography>

          <br />

          <Typography sx={{ fontWeight: "600" }}>
            9. Changes to Terms
          </Typography>

          <Typography sx={{ color: "grey" }}>
            if there is a need to revise or change the terms, Khatri Brothers
            Academy reserves the right to modify or update these Terms at any
            time without prior notice. The academy can make any changes to the
            Terms, which will be posted on our website. You are responsible for
            reviewing the Terms periodically for changes and staying updated.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TermsConditionsMain;
