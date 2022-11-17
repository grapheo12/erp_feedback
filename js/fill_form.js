var textBox, radioButton, start, course, prof, profCounter = 0, courseCounter = 0, profListening = false, courseListening = false;

browser.runtime.sendMessage({
	request: "getStatusOfAll&FeedbackType",
}).then((preference) => {
	console.log("User wants to save the preference for feedback type? : ", preference.all);
	console.log("Feedback Type = ", preference.feedback);
	try {
		if (!preference.all) {
			fill_form(preference.feedback);
			console.log("form filled");
			console.log("Choose next feedback type");
		} else {
			console.log("Just fill the captcha, rest I will handle");
			course = document.querySelectorAll('a[href="javascript:void(0)"]');
			prof = document.querySelectorAll('input[name="check"]');
			courseCounter = 0;
			handleCourse(preference.feedback);
		}
	} catch (err) {
		console.error(err);
	}
});

function handleCourse(feedback) {
	course[courseCounter].click(); courseCounter++;
	profCounter = 0;
	handleProf(feedback);
	var submitButton = document.getElementById("sub");
	var addCourseListener = (x) => {
		submitButton.addEventListener("click", () => {
				handleCourse(x);
			})
	};
	var removeCourseListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleCourse(x);
			})
	};
	var removeProfListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleProf(x);
			})
	};

	if (courseCounter < course.length) {
		if (!profListening) {
			courseListening = true; addCourseListener(feedback);
			// removeProfListener(feedback);
			submitButton.removeEventListener("click", handleProf);
			console.log("Waiting to go to next course, please fill the form");
		}
		profListening = false;
	} else {
		// removeProfListener(feedback);
		submitButton.removeEventListener("click", handleProf);
		// removeCourseListener(feedback);
		submitButton.removeEventListener("click", handleCourse);
		console.log("all courses handeled"); return;
	}
}

function handleProf(feedback) {
	prof[profCounter].click(); profCounter++;
	fill_form(feedback);
	console.log("Form filled");
	var submitButton = document.getElementById("sub");
	var addCourseListener = (x) => {
		submitButton.addEventListener("click", () => {
				handleCourse(x);
			})
	};
	var addProfListener = (x) => {
		submitButton.addEventListener("click", () => {
				handleProf(x);
			})
	};
	var removeCourseListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleCourse(x);
			})
	};
	var removeProfListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleProf(x);
			})
	};

	if (profCounter < prof.length) {
		if (!courseListening) {
			profListening = true; addProfListener(feedback);
			// removeCourseListener(feedback);
			submitButton.removeEventListener("click", handleCourse);
			console.log("Waiting to go to next prof, please fill the form");
		}
	} else {
		if (!profListening) {
			courseListening = true; addCourseListener(feedback);
			// removeProfListener(feedback);
			submitButton.removeEventListener("click", handleProf);
			console.log("all profs in this course handeled");
			console.log("Waiting to go to next course, please fill the form");
		}
		courseListening = false;
		return;
	}
}

function fill_form(feedback) {
	console.log("Feedback Type = ", feedback);
	textBox = document.querySelectorAll('textarea');

	if (textBox.length == 5) {
		switch (feedback) {
			case "positive":
				try{
				positive_theory_feedback();
				} catch (err) {
					console.error(err);
				}
				break;
			case "neutral":
				neutral_theory_feedback();
				break;
			case "negative":
				negative_theory_feedback();
				break;
		}
	}
	else {
		switch (feedback) {
			case "positive":
				positive_lab_feedback();
				break;
			case "neutral":
				neutral_lab_feedback();
				break;
			case "negative":
				negative_lab_feedback();
				break;
		}
	}
}

function positive_theory_feedback() {
	console.log("I am here");
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	var teacherStrengths = [
		"The teacher is understanding, approachable and caring",
		"The teacher has deep understanding and clarity of the subject",
		"The teacher clears doubts and make sure the students understand the concepts",
		"The teacher ensures that the speed of the lecture is perfect for everyone",
		"The teacher releases the slides and materials as soon as possible",
		"The teacher makes sure that the assignment load is not a lot on students"
	];
	// Randomly selecting teacher's strengths from the array created above
	textBox[0].value = teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

	textBox[1].value = "Nothing as such";  // this is the default Weakness
	textBox[3].value = "Nothing as such";  // replace with relevant text

	courseStrengths = [
		"This course is well structured and gave me a great understanding of the fundamental concepts",
		"This course is good for real life applications",
		"This course had enough number of tests to make the course thorough",
		"This course conveys the essence of the subject to the students at its best",
		"This course's content is intuitive",
		"This course is designed to ensure that the students are not left behind",
		"Overall this course was interesting and fun to study!"
	];
	// Randomly selecting course's strengths from the array created above
	textBox[2].value = courseStrengths[Math.floor(Math.random() * courseStrengths.length)];

	textBox[4].value = "No suggestions as such, so far so good";

	for (i = 5; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Excellent` OR `Very Good` everywhere
	for (i = start; i < radioButton.length - 10; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i + 3].click();
		else radioButton[i + 4].click();
	radioButton[start + 17].click(); // Clicks `Just Right` for pace
	radioButton[start + 52].click(); // Clicks `Average` for efforts
	radioButton[start + 57].click(); // Clicks `Average` for Workload
}

function positive_lab_feedback() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	var teacherStrengths = [
		"The teacher is understanding, approachable and caring",
		"The teacher has deep understanding and clarity of the subject",
		"The teacher clears doubts and make sure the students understand the concepts",
		"The teacher ensures that the students get ample amount of time for the experiment"
	];
	// Randomly selecting teacher's strengths from the array created above
	textBox[0].value = teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

	textBox[1].value = "Nothing as such";  // this is the default Weakness
	textBox[2].value = "No suggestions as such, so far so good";

	for (i = 3; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Excellent` OR `Very Good` everywhere
	for (i = start; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2))radioButton[i + 3].click();
		else radioButton[i + 4].click();
	radioButton[start + 47].click(); // Clicks `Average` for efforts
	radioButton[start + 52].click(); // Clicks `Average` for Workload
}

function neutral_theory_feedback() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	for (i = 0; i < textBox.length; i++)
		textBox[i].value = "Nothing as such";

	// Clicks `Good` OR `Very Good` everywhere
	for (i = start; i < radioButton.length - 10; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i + 2].click();
		else radioButton[i + 3].click();
	// Randomising selection between `Heavy` & `Average` for Efforts and Workload
	for (i = start + 52; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}

function neutral_lab_feedback() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	for (i = 0; i < textBox.length; i++)
		textBox[i].value = "Nothing as such";

	// Clicks `Good` OR `Very Good` everywhere
	for (i = start; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i + 2].click();
		else radioButton[i + 3].click();
	// Randomising selection between `Heavy` & `Average` for Efforts and Workload
	for (i = start + 47; i < start + 53; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}

function negative_theory_feedback() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	var teacherWeaknesses = [
		"The teacher is not approachable",
		"The teacher doesn't make sure the students understand the concepts",
		"The teacher doesn't ensures that the speed of the lecture is perfect for everyone",
		"The teacher is less engaging",
		"The teacher doesn't release the slides and materials on time",
		"The teacher gives too much workload in form of assignments"
	];
	// Randomly selecting teacher's weaknesses from the array created above
	textBox[1].value = teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

	textBox[0].value = "Unfortunately, can not remember any.";  // this is the default Strength
	textBox[2].value = "Unfortunately, can not remember any.";  // replace with relevant text

	courseWeaknesses = [
		"This course is not well structured and assumed the students to already have the basic knowledge of it",
		"This course doesn't reflect any real life applications for the subject of study",
		"This course conveys the essence of the subject in a hard to grasp manner",
		"This course's content is not intuitive",
		"This course has a steep learning curve",
		"Overall this course was not interesting to study!"
	];
	// Randomly selecting course's weaknesses from the array created above
	textBox[3].value = courseWeaknesses[Math.floor(Math.random() * courseWeaknesses.length)];

	suggestions = [
		"Update the course's content",
		"Make the course more engaging"
	];
	// Randomly selecting suggestions from the array created above
	textBox[4].value = suggestions[Math.floor(Math.random() * suggestions.length)];

	for (i = 5; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Poor` OR `Fair` everywhere
	for (i = start; i < radioButton.length - 10; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
	// Randomising selection between `Too Slow` & `Too Fast`
	if (Math.floor(Math.random() * 2)) radioButton[start + 15].click();
	else radioButton[start + 19].click();
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i = start + 53; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}

function negative_lab_feedback() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	var teacherWeaknesses = [
		"The teacher is not approachable",
		"The teacher doesn't make sure the students understand the concepts",
		"The teacher is less engaging",
		"The teacher doesn't release the experiment theory and reference material on time"
	];
	// Randomly selecting teacher's weaknesses from the array created above
	textBox[1].value = teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

	textBox[0].value = "Unfortunately, can not remember any.";  // this is the default Strength

	suggestions = [
		"Fix broken or faulty equipments, wastes a lot of time",
		"Give some extra theory regarding the experiments"
	];
	textBox[2].value = suggestions[Math.floor(Math.random() * suggestions.length)];

	for (i = 3; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Poor` OR `Fair` everywhere
	for (i = start; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i = start + 48; i < start + 54; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}