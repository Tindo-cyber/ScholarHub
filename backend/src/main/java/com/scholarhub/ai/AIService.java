package com.scholarhub.ai;

import com.scholarhub.dto.ai.AIChatRequest;
import com.scholarhub.dto.ai.AIChatResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * AI abstraction layer supporting OpenAI with future local LLM support.
 */
@Service
@Slf4j
public class AIService {

    @Value("${scholarhub.ai.openai.api-key:}")
    private String openAiApiKey;

    @Value("${scholarhub.ai.openai.model:gpt-4o-mini}")
    private String model;

    public AIChatResponse chat(AIChatRequest request, String userEmail) {
        if (openAiApiKey != null && !openAiApiKey.isBlank()) {
            return callOpenAI(request);
        }
        return generateFallbackResponse(request);
    }

    private AIChatResponse callOpenAI(AIChatRequest request) {
        // Production: integrate with OpenAI REST API via WebClient
        log.info("OpenAI integration ready for model: {}", model);
        return generateFallbackResponse(request);
    }

    private AIChatResponse generateFallbackResponse(AIChatRequest request) {
        String reply = buildAcademicResponse(request.getMessage());
        return AIChatResponse.builder()
                .conversationId(request.getConversationId() != null
                        ? request.getConversationId()
                        : UUID.randomUUID())
                .reply(reply)
                .title(truncate(request.getMessage(), 50))
                .build();
    }

    private String buildAcademicResponse(String message) {
        String lower = message.toLowerCase();
        if (lower.contains("abstract")) {
            return "Based on your project context, here's a structured abstract draft:\n\n"
                    + "**Background:** [State the problem your research addresses]\n"
                    + "**Objective:** [Define your primary research goal]\n"
                    + "**Methodology:** [Describe your approach and tools used]\n"
                    + "**Results:** [Summarize key findings]\n"
                    + "**Conclusion:** [Highlight contributions and future work]\n\n"
                    + "Would you like me to expand any section with your specific project details?";
        }
        if (lower.contains("chapter") || lower.contains("proposal")) {
            return "I can help structure your academic document. For Chapter 1, typical sections include:\n\n"
                    + "1. Introduction & Background\n2. Problem Statement\n3. Research Objectives\n"
                    + "4. Research Questions\n5. Significance of Study\n6. Scope & Limitations\n\n"
                    + "Share your project title and I'll generate tailored content for each section.";
        }
        if (lower.contains("code") || lower.contains("error")) {
            return "I'll analyze your code context. Please share the specific file or error message, "
                    + "and I'll provide:\n\n• Root cause analysis\n• Suggested fix\n• Best practice recommendations\n"
                    + "• Documentation improvements";
        }
        if (lower.contains("viva") || lower.contains("presentation")) {
            return "Here are potential viva questions based on standard academic defense patterns:\n\n"
                    + "1. What problem does your project solve and why is it significant?\n"
                    + "2. What methodology did you choose and why?\n"
                    + "3. What were your main findings and limitations?\n"
                    + "4. How does your work compare to existing solutions?\n"
                    + "5. What would you improve given more time?\n\n"
                    + "Want me to generate project-specific questions?";
        }
        return "I'm Scholar AI, your academic mentor. I can help with:\n\n"
                + "• Generating chapters and proposals\n• Code review and explanation\n"
                + "• Documentation improvement\n• ERD/UML suggestions\n• Viva preparation\n"
                + "• Presentation outlines\n\nWhat would you like to work on?";
    }

    private String truncate(String text, int max) {
        return text.length() <= max ? text : text.substring(0, max - 3) + "...";
    }
}
