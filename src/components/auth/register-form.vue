<template>
    <!-- Registration Form -->
    <div class=" text-white text-center font-bold p-5 mb-4" v-if="reg_show_alert" :class="reg_alert_variant">{{
        reg_alert_message }}</div>
    <vee-form :validation-schema="signUpSchema" @submit="register" :initial-values="userData">
        <!-- Name -->
        <div class="mb-3">
            <label class="inline-block mb-2">Name</label>
            <vee-field type="text" name="name" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded" placeholder="Enter Name" />
            <ErrorMessage class=" text-red-600" name="name" />

        </div>
        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <vee-field type="email" name="email" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded" placeholder="Enter Email" />
            <ErrorMessage class=" text-red-600" name="email" />
        </div>
        <!-- Age -->
        <div class="mb-3">
            <label class="inline-block mb-2">Age</label>
            <vee-field type="number" name="age" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded" />
            <ErrorMessage class=" text-red-600" name="age" />
        </div>
        <!-- Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <vee-field :bails="false" name="password" v-slot="{ field, errors }" type="password">
                <input type="password" v-bind="field" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded" placeholder="Password">
                <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
            </vee-field>
            <ErrorMessage class=" text-red-600" name="password" type="password" />
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Confirm Password</label>
            <vee-field type="password" name="confirm_password" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded" placeholder="Confirm Password" />
            <ErrorMessage class=" text-red-600" name="confirm_password" />
        </div>
        <!-- Country -->
        <div class="mb-3">
            <label class="inline-block mb-2">Country</label>
            <vee-field as="select" name="country" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Germany">Nigeria</option>
            </vee-field>
            <ErrorMessage class=" text-red-600" name="country" />
        </div>
        <!-- TOS -->
        <div class="mb-3 pl-6">
            <vee-field type="checkbox" name="tos" value="1" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
            <label class="inline-block">Accept terms of service</label>
        </div>
        <button :disabled="reg_in_submission" type="submit" class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
            Submit
        </button>
    </vee-form>
</template>

<script>
export default {
    name: "RegisterForm",
    data() {
        return {
            signUpSchema: {
                name: "required|min:3|max:100|alpha_spaces",
                email: "required|min:3|max:100|email",
                age: "required|min_value:18|max_value:150|numeric",
                password: "required|min:8|max:20",
                confirm_password: "required|confirmed:@password",
                country: "required|excluded:Nigeria",
                tos: "tos"
            },

            userData: {
                country: "USA"
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: 'bg-blue-500',
            reg_alert_message: 'Please wait! Your account is being created...'
        }
    }, methods: {
        async register(values) {
            this.reg_in_submission = true;
            this.reg_show_alert = true;
            this.reg_alert_variant = "bg-blue-500"
            this.reg_alert_message = "Please wait! Your account is being created..."

            try {

                await this.$store.dispatch('register', values)

            }
            catch (error) {
                this.reg_in_submission = false;

                this.reg_alert_variant = "bg-red-500"
                this.reg_alert_message = "An unexpected error occurred. Please try again later."
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode} : ${errorMessage}`);
                return
                // ..
            };

            this.reg_alert_variant = "bg-green-500"
            this.reg_alert_message = `Success! Verification email sent to ${values.email}...`

            // window.location.reload()

            // console.log(values);
        }
    },
};
</script>
