function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t-2  border-white p-2  py-6">
      <div className="container mx-auto text-center">
        <p className="text-md text-gray-200">
          &copy; {currentYear} Task Manager. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
