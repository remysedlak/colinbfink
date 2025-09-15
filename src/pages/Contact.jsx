function Contact() {
    return (
        <div className="p-4 justify-center items-center flex flex-col mx-auto">
            <h1 className="text-4xl mt-16 mb-4">Contact Me</h1>
            <form className="space-y-4 w-full max-w-2xl">
                <div>
                    <label className="block text-xl font-medium mb-1" htmlFor="name">Name</label>
                    <input className="w-full border border-2 p-3  text-lg" type="text" id="name" name="name" required />
                </div>
                <div>
                    <label className="block text-xl font-medium mb-1" htmlFor="email">Email</label>
                    <input className="w-full border border-2 p-3  text-lg" type="email" id="email" name="email" required />
                </div>
                <div>
                    <label className="block text-xl font-medium mb-1" htmlFor="message">Message</label>
                    <textarea className="w-full border border-2 p-3  text-lg" id="message" name="message" rows="4" required></textarea>
                </div>
                <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg" type="submit">Send</button>
            </form>
        </div>
    );
}
export default Contact;