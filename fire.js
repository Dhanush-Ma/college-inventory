const login = async (e) => {
  e.preventDefault();
  const { email, password } = formData;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setErrMsg("");
      navigate("/me");
    })
    .catch((err) => {
      const { code } = err;
      if (code === "auth/user-not-found")
        setErrMsg("User not found try Signing In!");
      if (code === "auth/wrong-password") setErrMsg("Invalid Password!");
      console.log(code);
    });
};

const signin = async (e) => {
  e.preventDefault();

  const { username, email, password } = formData;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setErrMsg("");
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          localStorage.setItem("userID", auth.currentUser.uid);
          navigate("/details");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      const { code } = err;
      if (code === "auth/missing-email") setErrMsg("Email Required!");

      if (code === "auth/weak-password")
        setErrMsg("Password should be at least 6 characters!");

      if (code === "auth/email-already-in-use")
        setErrMsg("User already registered!");
      console.log(code);
      console.log(err);
    });
};

async function uploadToDb() {
  await addDoc(collection(db, "user-details"), {
    userID: localStorage.getItem("userID"),
    ...data,
  })
    .then((res) => {
      console.log(res);
      localStorage.removeItem("userID");
      setLoading(false);
      navigate("/me");
    })
    .catch((err) => console.log(err));
}

auth.onAuthStateChanged((user) => {
  if (user != null) {
    setUser(user);
    getQuery(user.uid);
  } else navigate("/");
});

const getQuery = async (id) => {
  const q = query(collection(db, "user-details"), where("userID", "==", id));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc)
    // console.log(doc.id, " => ", doc.data());
    console.log(doc.data());
    setUserDetails(doc.data());
  });
};

const logout = (navigate) => {
  auth
    .signOut()
    .then(() => navigate("/"))
    .catch((err) => console.log(err));
};

const addDept = async () => {
  if (deptData.deptID && deptData.deptName) {
    console.log(id);
    const q = query(collection(db, "user-details"), where("userID", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docu) => {
      const docRef = doc(db, "user-details", docu.id);

      // Atomically add a new region to the "regions" array field.
      // async function updateDB(){
      await updateDoc(docRef, {
        organizationDepartments: arrayUnion(deptData),
      })
        .then((res) => {
          setDeptData({
            deptID: "",
            deptName: "",
          });
          setShowModal(false);
          alert("Department added successfully!");
          const getQuery = async (id) => {
            const q = query(
              collection(db, "user-details"),
              where("userID", "==", id)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // console.log(doc)
              // console.log(doc.id, " => ", doc.data());
              console.log(doc.data());
              setUserDetails(doc.data());
            });
          };
          getQuery(id);
        })
        .catch((err) => console.log(err));
      // }
    });
  }
};