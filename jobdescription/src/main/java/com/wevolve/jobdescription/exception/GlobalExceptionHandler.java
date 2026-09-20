package com.wevolve.jobdescription.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // --------------------------------------------------
    // ILLEGAL ARGUMENT
    // --------------------------------------------------

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(
            IllegalArgumentException exception,
            HttpServletRequest request) {

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Bad Request",
                exception.getMessage(),
                request.getRequestURI()
        );
    }

    // --------------------------------------------------
    // GENERAL EXCEPTION HANDLER
    // --------------------------------------------------

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(
            Exception exception,
            HttpServletRequest request) {

        GeminiErrorType geminiError =
                detectGeminiError(exception);

        if (geminiError != null) {

            return buildResponse(
                    geminiError.status(),
                    geminiError.error(),
                    geminiError.message(),
                    request.getRequestURI()
            );
        }

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal Server Error",
                "An unexpected error occurred while processing the request.",
                request.getRequestURI()
        );
    }

    // --------------------------------------------------
    // GEMINI ERROR DETECTION
    // --------------------------------------------------

    private GeminiErrorType detectGeminiError(
            Throwable exception) {

        Throwable current = exception;

        while (current != null) {

            String message = current.getMessage();

            if (message != null) {

                String normalized =
                        message.toLowerCase();

                // --------------------------------------
                // QUOTA / RATE LIMIT
                // --------------------------------------

                if (normalized.contains("quota")
                        || normalized.contains("resource_exhausted")
                        || normalized.contains("rate limit")
                        || normalized.contains("too many requests")
                        || normalized.contains("429")) {

                    return new GeminiErrorType(
                            HttpStatus.TOO_MANY_REQUESTS,
                            "AI Quota Exceeded",
                            "The Gemini AI quota has been exceeded. "
                                    + "Please try again later."
                    );
                }

                // --------------------------------------
                // INVALID API KEY
                // --------------------------------------

                if (normalized.contains("api key not valid")
                        || normalized.contains("api_key_invalid")
                        || normalized.contains("invalid api key")
                        || normalized.contains("unauthorized")
                        || normalized.contains("401")) {

                    return new GeminiErrorType(
                            HttpStatus.UNAUTHORIZED,
                            "Invalid AI API Key",
                            "The Gemini API key is invalid or unavailable. "
                                    + "Please check the GEMINI_API_KEY configuration."
                    );
                }

                // --------------------------------------
                // FORBIDDEN
                // --------------------------------------

                if (normalized.contains("permission denied")
                        || normalized.contains("forbidden")
                        || normalized.contains("403")) {

                    return new GeminiErrorType(
                            HttpStatus.FORBIDDEN,
                            "AI Access Forbidden",
                            "The Gemini API request was rejected because "
                                    + "the configured project does not have permission "
                                    + "to use the requested service."
                    );
                }

                // --------------------------------------
                // MODEL / API FAILURE
                // --------------------------------------

                if (normalized.contains("gemini")
                        || normalized.contains("generativelanguage")
                        || normalized.contains("google genai")
                        || normalized.contains("generatecontent")) {

                    return new GeminiErrorType(
                            HttpStatus.BAD_GATEWAY,
                            "AI Service Error",
                            "The Gemini AI service could not process the request. "
                                    + "Please try again later."
                    );
                }
            }

            current = current.getCause();
        }

        return null;
    }

    // --------------------------------------------------
    // RESPONSE BUILDER
    // --------------------------------------------------

    private ResponseEntity<Map<String, Object>> buildResponse(
            HttpStatus status,
            String error,
            String message,
            String path) {

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "timestamp",
                Instant.now().toString()
        );

        response.put(
                "status",
                status.value()
        );

        response.put(
                "error",
                error
        );

        response.put(
                "message",
                message
        );

        response.put(
                "path",
                path
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    // --------------------------------------------------
    // INTERNAL ERROR TYPE
    // --------------------------------------------------

    private record GeminiErrorType(
            HttpStatus status,
            String error,
            String message) {
    }
}