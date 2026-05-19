(function () {
	const toast = document.getElementById("toast");
	let toastTimer;

	function showToast(text) {
		if (!toast) return;
		toast.textContent = text;
		toast.classList.add("show");
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => toast.classList.remove("show"), 1400);
	}

	document.querySelectorAll(".copy-target").forEach((el) => {
		el.addEventListener("click", async () => {
			const value = el.dataset.copy;
			if (!value) return;
			try {
				await navigator.clipboard.writeText(value);
				el.classList.add("copied");
				showToast("Copied " + value);
				setTimeout(() => el.classList.remove("copied"), 1200);
			} catch (err) {
				const ta = document.createElement("textarea");
				ta.value = value;
				ta.setAttribute("readonly", "");
				ta.style.position = "absolute";
				ta.style.left = "-9999px";
				document.body.appendChild(ta);
				ta.select();
				try {
					document.execCommand("copy");
					showToast("Copied " + value);
				} catch (e) {
					showToast("Couldn't copy");
				}
				document.body.removeChild(ta);
			}
		});
	});
})();
