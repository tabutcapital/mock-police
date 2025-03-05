export const sendMockEmail = (to, subject, body) => {
  console.log('Mock email sent:', { to, subject, body });
  // In real app, this would integrate with an email service
};

export const notifyStatusChange = (report, user) => {
  sendMockEmail(
    user.email,
    `Report Status Update - ${report.title}`,
    `Your report (ID: ${report.id}) status has been updated to: ${report.status}`
  );
};
