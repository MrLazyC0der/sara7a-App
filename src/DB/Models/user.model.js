// import mongoose from "mongoose";
// import { GenderEnum, RoleEnum, ProviderEnum } from "../../Utils/Enums/user.enum.js";
// const userSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//             trim: true,
//             minLength: 2,
//             maxLength: 50,
//         },
//         lastName: {
//             type: String,
//             required: true,
//             trim: true,
//             minLength: 2,
//             maxLength: 50,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             trim: true,
//             lowercase: true,
//         },
//         password: {
//             type: String,
//             required: function(){
//                 return this.provider === ProviderEnum.System;
//             },
//             minlength: 6,
//         },
//         // phone 
//         phone: {
//             type: String,
//             //default value is null
//             default: "0000000000",
            
//         },
//         gender: {
//             type: Number,
//             enum: Object.values(GenderEnum),
//             default: GenderEnum.Male,
//         },
//         role: {
//             type: Number,
//             enum: Object.values(RoleEnum),
//             default: RoleEnum.User,
//         },
//         provider: {
//             type: Number,
//             enum: Object.values(ProviderEnum),
//             default: ProviderEnum.System,
//         },
//         confirmEmail:Date, 
//         forgetPasswordOTP:String, 
//         profileImage: {
//             type: String,
//             default: "",
//         },
//         isActive: {
//             type: Boolean,
//             default: true,
//         },
//         otp: {
//             type: String,
//             default: "",
//         },
//         freezedBy: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             default: null,
//         },
//         freezedAt: {
//             type: Date,
//             default: null,
//         },
//         unFreezedBy: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             default: null,
//         },
//         unFreezedAt: {
//             type: Date,
//             default: null,
//         },
        
//     },
//     {
//         timestamps: true,
//         toJSON: { virtuals: true },   
//         toObject: { virtuals: true }, 
//     }
// );

// userSchema.virtual("username")
//     .get(function () {
//         return `${this.firstName} ${this.lastName}`;
//     })
//     .set(function (value) {
//         const [first, ...rest] = value.trim().split(" ");
//         this.firstName = first;
//         this.lastName = rest.join(" ");
//     });

// export const UserModel = mongoose.model("User", userSchema);
import mongoose from "mongoose";
import { GenderEnum, RoleEnum, ProviderEnum } from "../../Utils/Enums/user.enum.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minLength: [2, "First name must be at least 2 characters"],
            maxLength: [20, "First name must be at most 20 characters"],  // ✅ 50 → 20
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minLength: [2, "Last name must be at least 2 characters"],
            maxLength: [20, "Last name must be at most 20 characters"],   // ✅ 50 → 20
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: function () {
                return this.provider === ProviderEnum.System;
            },
            minlength: [6, "Password must be at least 6 characters"],
        },
        phone: {
            type: String,
            default: "0000000000",
            
        },
        gender: {
            type: Number,
            enum: {
                values: Object.values(GenderEnum),
                message: "Invalid gender value",
            },
            default: GenderEnum.Male,
        },
        role: {
            type: Number,
            enum: {
                values: Object.values(RoleEnum),
                message: "Invalid role value",
            },
            default: RoleEnum.User,
        },
        provider: {
            type: Number,
            enum: {
                values: Object.values(ProviderEnum),
                message: "Invalid provider value",
            },
            default: ProviderEnum.System,
        },
        confirmEmail: Date,
        forgetPasswordOTP: String,
        profileImage: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        otp: {
            type: String,
            default: "",
        },
        freezedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        freezedAt: {
            type: Date,
            default: null,
        },
        unFreezedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        unFreezedAt: {
            type: Date,
            default: null,
        },
        changeCredentialsAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
    
);

userSchema.virtual("username")
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })
    .set(function (value) {
        const [first, ...rest] = value.trim().split(" ");
        this.firstName = first;
        this.lastName = rest.join(" ");
    });

userSchema.virtual("messagesReceived", {
    ref: "Message",
    localField: "_id",
    foreignField: "receiver",
    options: {
        select: "content sender createdAt",
    },
});
userSchema.virtual("messagesSent", {
    ref: "Message",
    localField: "_id",
    foreignField: "sender",
    options: {
        select: "content receiver createdAt",
    },
});

export const UserModel = mongoose.model("User", userSchema);